import {
  Avatar,
  Col,
  UploadFile,
  notification,
  Typography,
  Button,
  Image,
  Spin,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import Upload, { RcFile } from "antd/es/upload";
import { useState, useRef, useEffect } from "react";
import { UploadChangeParam } from "antd/lib/upload";
import type { GetProp, UploadProps } from "antd";
import { aboutForm } from "./Form.fields";
import { theme } from "../../themes";
import * as FormStyled from "./Form.styled";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import axios from 'axios';

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
  dataSource
}: any) => {
  useDocumentTitle("Become a tutor");

  const [fileList, setFileList] = useState<UploadFile[]>(initialValues?.fileList || []);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string| null>(null);
  // const [fileList, setFileList] = useState<UploadFile[]>([]);
  // const [agreement, setAgreement] = useState<boolean>(false)
  const file = useRef<RcFile | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | null >(initialValues?.imageUrl || null);
  const [api, contextHolderNotification] = notification.useNotification({
    top: 100,
  });

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
  const getBase64 = (file:RcFile) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
  const handlePreview = async (file:UploadFile) => {
    
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleFinish = (values: any) => {
    onFinish({ ...values, fileList, imageUrl });
  };
  const beforeUpload = (file:RcFile) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFileList((prev) => [...prev, { uid: file.uid, name: file.name, status: 'done', url: reader.result as string }]);
      setImageUrl(reader.result as string);
      // setFileList((prev) => [...prev, { url: reader.result }]);
    };
  
    // then upload `file` from the argument manually
    return false;
  };

  const normFile = (e: any) => {
    console.log('Upload event:', e);
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
        requiredMark="optional"
        size="middle"
        onFinish={handleFinish}
        initialValues={initialValues}
      >
        <FormStyled.FormContainer>
          <FormStyled.FormTitle level={1}>About</FormStyled.FormTitle> <br />
          <FormStyled.FormDescription>
            Start creating your public tutor profile. Your progress will be
            automatically saved as you complete each section. You can return at
            any time to finish your registration.
          </FormStyled.FormDescription>
          {aboutForm.map((field) => {
            return (
              <FormStyled.FormItem
                key={field.key}
                label={field.label}
                name={field.name}
                rules={field.rules}
                $width={field.$width ? field.$width : "100%"}
                initialValue={field.initialValue}
                validateFirst
              >
                {field.children}
              </FormStyled.FormItem>
            );
          })}
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
          {/* <FormStyled.FormContainer style={{  margin: "auto"}}> */}
          <Col style={{ margin: `auto` }}>
                    
                  
            <FormStyled.FormItem
              name="avatar"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[{ required: false, message: "Please upload an avatar!" }]}
              
            >
              <ImgCrop 
                rotationSlider 
                quality={1}
                showReset
                showGrid
                >
              <Upload
                name="avatar"
                // action=''
                listType="picture-card"
                fileList={fileList}
                onRemove={() => (setFileList([]))}
                // onChange={onChange}
                onPreview={handlePreview}
                accept=".jpg,.jpeg,.png"
                // beforeUpload={() => false} // Prevent upload by return false
                beforeUpload={beforeUpload}
                
                
              >
                {fileList.length < 1 && "+ Upload"}
              </Upload>
          </ImgCrop>
          
            </FormStyled.FormItem>
          {/* </FormStyled.FormContainer> */}
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
              // checked={isCheckedBox.current}
              // onChange={(e) => setAgreement(e.target.checked)}
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
