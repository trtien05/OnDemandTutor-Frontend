import { Col, Button, UploadFile } from "antd";
import { FieldType } from "./Form.fields";
import * as FormStyled from "./Form.styled";
import { InboxOutlined } from '@ant-design/icons';
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { useEffect, useState } from "react";
import Dragger from "antd/es/upload/Dragger";
import { UploadChangeParam } from "antd/es/upload";

const Form2 = ({
  diploma,
  onAddDiploma,
  onRemoveDiploma,
  onFinish,
  initialValues,
  onClickBack,
}: any) => {
  useDocumentTitle("Become a tutor");

  const [fileList, setFileList] = useState<UploadFile[]>(initialValues?.fileList || []);

  useEffect(() => {
    window.scrollTo({ top: 100, behavior: "smooth" });
  }, []);

  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList.length>0?[e.fileList[e.fileList.length - 1]]:[];
  };
  const onChange = ({ fileList: newFileList }: UploadChangeParam<UploadFile>) => {
    setFileList([newFileList[newFileList.length - 1]]);
  };
  const handleFinish = (values: any) => {
    onFinish({ ...values, fileList })
  }


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
          <FormStyled.FormTitle level={1}>Education</FormStyled.FormTitle>

          {diploma.map((form: FieldType[], formIndex: number) => (
            <div>
              {formIndex > 0 && (
                <Button
                  type="dashed"
                  style={{ width: `100%`, margin: `24px 0px` }}
                  onClick={() => onRemoveDiploma(formIndex)}
                >
                  Remove
                </Button>
              )}
              <FormStyled.FormContainer key={formIndex}>
                {form.map((field) => {

                  const diplomaVerificationProps = field.name.includes('diplomaVerification')
                    ? {
                      valuePropName: 'fileList',
                      getValueFromEvent: normFile,
                    }
                    : {};
                  return (
                    <FormStyled.FormItem
                      key={field.key + '_' + formIndex}
                      label={field.label}
                      name={field.name + '_' + formIndex}
                      rules={field.rules}
                      $width={field.$width ? field.$width : "100%"}
                      initialValue={field.initialValue}
                      {...diplomaVerificationProps}
                      validateFirst
                    >

                      {field.name.includes(`diplomaVerification`) &&
                        (<Dragger
                          name={field.name + "_" + formIndex}
                          fileList={fileList}
                          listType="picture"
                          showUploadList={true}
                          // onChange={onDiplomaFileChange}
                          onChange={onChange}
                          accept=".jpg,.jpeg,.png,.pdf"
                          beforeUpload={() => false} // Prevent upload by return false
                        >
                          <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                          </p>
                          <p className="ant-upload-text">Click or drag file to this area to upload</p>
                          <p className="ant-upload-hint">Support for a single image (JPG/PNG) or PDF file no larger than 5MB</p>
                        </Dragger>)}
                      {field.children}
                    </FormStyled.FormItem>
                  )
                })}
              </FormStyled.FormContainer>
            </div>
          ))}
          <Button type="dashed" onClick={onAddDiploma}>
            Add another diploma
          </Button>
        </FormStyled.FormContainer>

        <FormStyled.ButtonDiv>
          <Button type="default" onClick={() => onClickBack(1)}>
            Back
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginLeft: `24px` }}
          >
            Save and continue
          </Button>
        </FormStyled.ButtonDiv>
      </FormStyled.FormWrapper>
    </Col>
  );
};

export default Form2;