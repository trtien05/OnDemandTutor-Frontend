import { Col, Button, Checkbox } from 'antd';

import { useState } from 'react';
import { certificateForm, FieldType } from './Form.fields';

import * as FormStyled from './Form.styled';

import useDocumentTitle from '../../hooks/useDocumentTitle';

const Form2 = ({ onFinish, initialValues, onClickBack }: any) => {
  useDocumentTitle('Become a tutor');

  //const file = useRef<UploadFile>();
  const [form, setForm] = useState<FieldType[]>(certificateForm);
  const [visibility, setVisibility] = useState<boolean>(false)

  const addField = () => {
    const newFieldKey = form.length + 1;
    const newForm: FieldType[] = certificateForm.map((field) => ({
      ...field,
      key: field.key + newFieldKey,
      label: field.label,
      name: field.name,
      rules: field.rules,
      children: field.children,
      initialValue: field.initialValue,
      $width: field.$width,
    }));
    setForm([...form, ...newForm]);
  };

  return (
    <Col lg={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }} style={{ margin: `auto` }}>
      <Checkbox
        checked={visibility}
        onChange={(e) => setVisibility(e.target.checked)}
      >
        I don’t have relevant certificates
      </Checkbox>

      <FormStyled.FormWrapper
        labelAlign='left'
        layout='vertical'
        requiredMark='optional'
        size='middle'
        onFinish={onFinish}
        initialValues={initialValues}
        disabled={visibility}
        hidden={visibility}>
        <FormStyled.FormContainer>
          <FormStyled.FormTitle level={1}>Certificate</FormStyled.FormTitle>
          <FormStyled.FormDescription>Do you have any relevant certificates? If so, describe them to enhance your profile credibility and get more students.</FormStyled.FormDescription>

          {form.map((field) => {
            return (<FormStyled.FormItem
                  key={field.key}
                  label={field.label}
                  name={field.name}
                  rules={field.rules}
                  $width={field.$width ? field.$width : '100%'}
                  initialValue={field.initialValue}
                  validateFirst
                >
                  {field.children}
                </FormStyled.FormItem>)
          })}
        </FormStyled.FormContainer>
        <Button type="dashed" onClick={addField}>
          Add another certificate
        </Button>
        <div style={{ alignSelf: 'flex-end' }}>
          <Button type="default" onClick={() => onClickBack(1)}>Back</Button>
          <Button type="primary" htmlType="submit" style={{ marginLeft: `24px` }}>Save and continue</Button>
        </div>

      </FormStyled.FormWrapper>
    </Col>
  )
}

export default Form2;


