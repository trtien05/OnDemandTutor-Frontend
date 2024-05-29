import { Col, Button, Checkbox, Form } from "antd";

import { useCallback, useState, memo } from "react";
import { certificateForm, FieldType } from "./Form.fields";

import * as FormStyled from "./Form.styled";

import useDocumentTitle from "../../hooks/useDocumentTitle";
// interface Form3Props {
//   isTicked: boolean;
//   onTickChange: (checked: boolean) => void;
//   onFinish: (values: any) => void;
//   initialValues: any;
// }
const Form3 = ({
  certificate,
  onAddCertificate,
  onRemoveCertificate,
  isTicked,
  onTickChange,
  onFinish,
  initialValues,
  onClickBack,
  certificateFile,
  onCertificateFileChange
}: any) => {
  useDocumentTitle("Become a tutor");


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
            certificate.map((certificate: FieldType[], formIndex: number) => (
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
                  {certificate.map((field) => (
                    <FormStyled.FormItem
                      key={field.key + '_' + formIndex}
                      label={field.label}
                      name={field.name + '_' + formIndex}
                      rules={field.rules}
                      $width={field.$width ? field.$width : "100%"}
                      initialValue={field.initialValue}
                      {...(field.name.includes(`certificateVerification_${formIndex}`) && { valuePropName: 'fileList' })}
                      validateFirst
                    >
                      {field.children}
                    </FormStyled.FormItem>
                  ))}
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
