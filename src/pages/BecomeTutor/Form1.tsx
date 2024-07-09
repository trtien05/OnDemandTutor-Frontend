import {
  Col,
  UploadFile,
  Button,
  Image,
  Form,
} from "antd";
import ImgCrop from "antd-img-crop";
import Upload, { RcFile, UploadChangeParam } from "antd/es/upload";
import { useEffect, useState } from "react";
import { aboutForm } from "./Form.fields";
import * as FormStyled from "./Form.styled";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { validateFileSize, validateFileType } from "../../utils/UploadImg";
import dayjs from 'dayjs';
//Using the Form1Props interface ensures type safety and clarity,
//making it easier to understand what props the Form1 component expects and how they should be used.
interface Form1Props {
  agreement: boolean;
  onAgreementChange: (checked: boolean) => void;
  onFinish: (values: any) => void;
  initialValues: any;
  dataSource: any;
}

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
  const [previewImage, setPreviewImage] = useState<string>('');
  const [form] = Form.useForm();

  const onChange = ({ fileList: newFileList }: UploadChangeParam<UploadFile>) => {
    if (newFileList.length < 1) {
      setFileList(newFileList);
    }
    else {
      setFileList(newFileList);
      if (!validateFileSize(newFileList[0], 5)) {
        newFileList[0].status = 'error';
        newFileList[0].response = 'File size must be less than 5MB';
        return;
      }
      if (!validateFileType(newFileList[0], 'image/png') &&
        !validateFileType(newFileList[0], 'image/jpg') &&
        !validateFileType(newFileList[0], 'image/jpeg')) {
        newFileList[0].status = 'error';
        newFileList[0].response = 'File type must be .png, .jpg or .jpeg';
        return;
      };

      for (let index = 0; index < newFileList.length; index++) {
        newFileList[index].status = 'done'
      }
    }
  };

  useEffect(() => {
    if (!initialValues) {
      form.setFieldsValue({
        fullName: dataSource.fullName,
        email: dataSource.email,
        phoneNumber: dataSource.phoneNumber,
        address: dataSource.address,
        dayOfBirth: dataSource.dateOfBirth ? dayjs(dataSource.dateOfBirth, 'YYYY-MM-DD') : null,
        gender: dataSource.gender ? `${(dataSource.gender as string).slice(0, 1).toUpperCase()}${(dataSource.gender as string).slice(1)}` : null,
      });
    }
    window.scrollTo({ top: 100, behavior: "smooth" });
  }, [dataSource]);

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

    if (file.preview) {
      setPreviewImage(file.preview);
    } else if (file.url) {
      setPreviewImage(file.url);
    }
    setPreviewOpen(true);
  };

  const handleFinish = (values: any) => {
    if (values.gender && (values.gender.toLocaleString()).includes('ale')) 
      values.gender = form.getFieldValue('gender').includes('Female')?'true':'false';
    if (fileList[0] && fileList[0].status === 'done') {
      onFinish({ ...values, fileList });
    }
    else onFinish({ ...values, fileList: [] });
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
        form={form}
        size="middle"
        onFinish={(values) => handleFinish(values)}
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
          <FormStyled.FormDescription style={{ display: `block` }}>
            Make a great first impression!
            <br />
            Tutors who look friendly and professional get the most students
          </FormStyled.FormDescription>
          <br />

          <FormStyled.FormItem
            name="avatar"
            valuePropName="fileList"
            getValueFromEvent={(e) => e && e.fileList}
            rules={
              [
                {
                  required: false,
                  message: "Please upload an avatar!"
                }
              ]
            }
            tooltip={{ title: 'Please upload an avatar!' }}
          >
            <div style={{ display: `flex`, alignItems: `center`, justifyContent: `center` }}>
              <ImgCrop
                rotationSlider
                quality={1}
                showReset
                showGrid
              >
                <Upload
                  name="avatar"
                  listType="picture-card"
                  fileList={fileList}
                  onChange={onChange}
                  onPreview={handlePreview}
                  accept=".jpg,.jpeg,.png"
                  style={{ display: `flex`, alignItems: `center`, justifyContent: `center` }}
                >
                  {fileList.length < 1 && "+ Upload"}
                </Upload>
              </ImgCrop>
            </div>
          </FormStyled.FormItem>

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
