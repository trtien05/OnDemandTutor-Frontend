import {
  Col,
  UploadFile,
  Button,
  Image,
  Input,
} from "antd";
import ImgCrop from "antd-img-crop";
import Upload, { RcFile } from "antd/es/upload";
import { useState } from "react";
import { aboutForm } from "./Form.fields";
import * as FormStyled from "./Form.styled";
import useDocumentTitle from "../../hooks/useDocumentTitle";
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
  const [previewImage, setPreviewImage] = useState<string| null>(null);
  const [imageUrl, setImageUrl] = useState<string | null >(initialValues?.imageUrl || null);


  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    for (let index = 0; index < newFileList.length; index++) {
      newFileList[index].status='done'
      
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
    //   // setFileList((prev) => [...prev, { uid: file.uid, name: file.name, status: 'done', url: reader.result as string }]);
      setImageUrl(reader.result as string);
      setFileList((prev) => [...prev, file]);
    };
  
    // then upload `file` from the argument manually
    return false;
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
                
                validateFirst
              >
                {/* {field.name.includes('phoneNumber') && (<Input placeholder={dataSource[field.name]} disabled />)} */}
                {field.name.includes('email') && (<Input placeholder={dataSource[field.name]} readOnly />)}
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
          {/* <FormStyled.FormContainer style={{  margin: "auto"}}> */}
          
                    
                  
            <FormStyled.FormItem
              name="avatar"
              valuePropName="fileList"
              getValueFromEvent={(e) => e && e.fileList}
              rules={[{ required: false, message: "Please upload an avatar!" }]}
              // style={{ display: `flex`, alignItems: `center`, justifyContent: `center`}}
            >
              <div style={{ display: `flex`, alignItems: `center`, justifyContent: `center`}}>
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
                onChange={onChange}
                onPreview={handlePreview}
                accept=".jpg,.jpeg,.png"
                // beforeUpload={() => false} // Prevent upload by return false
                // beforeUpload={beforeUpload} 
                style={{ display: `flex`, alignItems: `center`, justifyContent: `center` }}
              >
                {fileList.length < 1 && "+ Upload"}
              </Upload>
            </ImgCrop>
            </div>
            </FormStyled.FormItem>
          {/* </FormStyled.FormContainer> */}
          
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
