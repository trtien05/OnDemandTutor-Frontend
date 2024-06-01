import {
  Avatar,
  Col,
  UploadFile,
  notification,
  Typography,
  Button,
  Image,
  Spin,
  Input,
  Form,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import Upload, { RcFile } from "antd/es/upload";
import { useState, useRef, useEffect } from "react";
import { UploadChangeParam } from "antd/lib/upload";
import type { GetProp, UploadProps } from "antd";
import { aboutForm } from "./Form.fields";
import * as FormStyled from "./Form.styled";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { FieldPath } from "firebase/firestore";

//Using the Form1Props interface ensures type safety and clarity,
//making it easier to understand what props the Form1 component expects and how they should be used.
interface Form1Props {
  agreement: boolean;
  onAgreementChange: (checked: boolean) => void;
  onFinish: (values: any) => void;
  initialValues: any;
  dataSource: any;
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const Form1: React.FC<Form1Props> = ({
  agreement,
  onAgreementChange,
  onFinish,
  initialValues,
  dataSource,
}) => {
  useDocumentTitle("Become a tutor");

  const [fileList, setFileList] = useState<UploadFile[]>(initialValues?.fileList || []);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const file = useRef<RcFile | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(initialValues?.imageUrl || null);
  const [form] = Form.useForm();

  useEffect(() => {
    // Set initial values only when the component mounts
    form.setFieldsValue({ ...initialValues, ...dataSource });
  }, []);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList.length > 0) {
      const file = newFileList[0].originFileObj as RcFile;
      const reader = new FileReader();
      reader.onload = () => setImageUrl(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setImageUrl(null);
    }
  };

  const getBase64 = (file: RcFile) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || file.preview );
    setPreviewOpen(true);
  };

  const handleFinish = (values: any) => {
    onFinish({ ...values, fileList, imageUrl });
  };

  const beforeUpload = (file: RcFile) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFileList((prev) => [...prev,  
        //{ uid: file.uid, name: file.name, status: 'done', url: reader.result as string }
      file
      ]);
      setImageUrl(reader.result as string);
    };
    return false;
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <Col
      lg={{ span: 12 }}
      sm={{ span: 16 }}
      xs={{ span: 24 }}
      style={{ margin: `auto` }}
    >
      <FormStyled.FormWrapper
        labelAlign="left"
        layout="vertical"
        requiredMark={false}
        size="middle"
        onFinish={handleFinish}
        form={form}
        initialValues={initialValues}
      >
        <FormStyled.FormContainer>
          <FormStyled.FormTitle level={1}>About</FormStyled.FormTitle> <br />
          <FormStyled.FormDescription>
            Start creating your public tutor profile. Your progress will be
            automatically saved as you complete each section. You can return at
            any time to finish your registration.
          </FormStyled.FormDescription>
          {aboutForm.map((field) => (
            <FormStyled.FormItem
              key={field.key}
              label={field.label}
              name={field.name}
              rules={field.rules}
              $width={field.$width ? field.$width : "100%"}
              initialValue={dataSource[field.name]} // Use initial value from dataSource
              validateFirst
            >
              {field.name.includes('phoneNumber') && (<Input placeholder={dataSource[field.name]} disabled />)}
              {field.name.includes('email') && (<Input placeholder={dataSource[field.name]} disabled />)}
              {!field.name.includes('email') && !field.name.includes('phoneNumber') && (field.children)}
            </FormStyled.FormItem>
          ))}
          <FormStyled.FormTitle style={{ display: `block` }}>
            Profile picture
          </FormStyled.FormTitle>{" "}
          <br />
          <FormStyled.FormDescription>
            Make a great first impression!
            <br />
            Tutors who look friendly and professional get the most students
          </FormStyled.FormDescription>
          <br />
          <Col style={{ margin: `auto` }}>
            <FormStyled.FormItem
              name="avatar"
              valuePropName='fileList'
              getValueFromEvent={normFile}
              rules={[{ required: false, message: "Please upload an avatar!" }]}
            >
              <ImgCrop rotationSlider quality={1} showReset showGrid>
                <Upload
                  name="avatar"
                  listType="picture-card"
                  fileList={fileList}
                  onRemove={() => setFileList([])}
                  onPreview={handlePreview}
                  accept=".jpg,.jpeg,.png"
                  beforeUpload={beforeUpload}
                >
                  {fileList.length < 1 && "+ Upload"}
                </Upload>
              </ImgCrop>
            </FormStyled.FormItem>
          </Col>
          {previewImage && (
            <Image
              wrapperStyle={{
                height: "200%",
              }}
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage(""),
              }}
              src={previewImage}
              style={{ display: 'none' }} // Ensure the image is not displayed
            />
          )}
          <FormStyled.FormItem
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                required: true,
                message: "You must agree to our Terms and Condition to proceed",
              },
            ]}
          >
            <FormStyled.FormCheckbox
              name="agreement"
              style={{ margin: `0px` }}
              checked={agreement}
              onChange={(e) => onAgreementChange(e.target.checked)}
            >
              By clicking Save and continue, I confirm that I’m over 18 years
              old. I also have read and agreed with the{" "}
              <a href="#" style={{ textDecoration: "underline" }}>
                Terms and Condition
              </a>
              .
            </FormStyled.FormCheckbox>
          </FormStyled.FormItem>
        </FormStyled.FormContainer>
        {agreement && (
          <FormStyled.ButtonDiv>
            <Button type="primary" htmlType="submit">
              Save and continue
            </Button>
          </FormStyled.ButtonDiv>
        )}
      </FormStyled.FormWrapper>
    </Col>
  );
};

export default Form1;
