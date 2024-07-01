import { Col, Button, Form, UploadFile, Upload } from "antd";

import { useState, memo, useEffect } from "react";
import { FieldType } from "./Form.fields";
import { InboxOutlined } from '@ant-design/icons';
import * as FormStyled from "./Form.styled";

import useDocumentTitle from "../../hooks/useDocumentTitle";

const Form3 = ({
  certificate,
  onAddCertificate,
  onRemoveCertificate,
  isTicked,
  onTickChange,
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
    return e?.fileList.length > 0 ? [e.fileList[e.fileList.length - 1]] : [];
  };
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList[newFileList.length - 1]);
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
        onFinish={onFinish}
        initialValues={initialValues}
      >
        <FormStyled.FormContainer>
          <FormStyled.FormTitle level={1}>Certificate</FormStyled.FormTitle>
          <FormStyled.FormDescription>
            Do you have any relevant certificates? If so, describe them to
            enhance your profile credibility and get more students.
          </FormStyled.FormDescription>

          <Form.Item
            name="noCertificate"
            valuePropName="checked"
            style={{ margin: `0` }}
          >
            <FormStyled.FormCheckbox
              name="noCertificate"
              style={{ margin: `0` }}
              checked={isTicked}
              onChange={(e) => onTickChange(e.target.checked)}
            >
              I don’t have relevant certificates.
            </FormStyled.FormCheckbox>
          </Form.Item>

          {!isTicked &&
            certificate.map((certificateForm: FieldType[], formIndex: number) => (
              <div>
                {formIndex > 0 && (
                  <Button
                    type="dashed"
                    style={{ width: `100%`, margin: `24px 0px` }}
                    onClick={() => onRemoveCertificate(formIndex)}
                  >
                    Remove
                  </Button>
                )}
                <FormStyled.FormContainer key={formIndex}>

                  {certificateForm.map((field) => {
                    const certificateVerificationProps = field.name.includes('certificateVerification')
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
                        {...certificateVerificationProps}
                        validateFirst
                      >
                        {field.name.includes(`certificateVerification`) &&
                          (<Upload.Dragger
                            name={field.name + "_" + formIndex}
                            fileList={fileList}
                            listType="picture"
                            showUploadList={true}
                            onChange={onChange}
                            accept=".jpg,.jpeg,.png,.pdf"
                            beforeUpload={() => false} // Prevent upload by return false
                          >
                            <p className="ant-upload-drag-icon">
                              <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">Support for a single image (JPG/PNG) or PDF file.</p>
                          </Upload.Dragger>)}
                        {field.children}
                      </FormStyled.FormItem>
                    )
                  })}
                </FormStyled.FormContainer>
              </div>
            ))}
          {!isTicked &&
            <Button type="dashed" onClick={onAddCertificate}>
              Add another certificate
            </Button>}

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

export default memo(Form3);
