import { Col, Button } from 'antd';

import { useState } from 'react';
import { educationForm, FieldType } from './Form.fields';

import * as FormStyled from './Form.styled';

import useDocumentTitle from '../../hooks/useDocumentTitle';

const Form2 = ({ onFinish, initialValues, onClickBack }: any) => {
  useDocumentTitle('Become a tutor');

  //const file = useRef<UploadFile>();
  const [form, setForm] = useState<FieldType[]>(educationForm);

  const addField = () => {
    const newFieldKey = form.length + 1;
    const newForm: FieldType[] = educationForm.map((field) => ({
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

      <FormStyled.FormWrapper
        labelAlign='left'
        layout='vertical'
        requiredMark='optional'
        size='middle'
        onFinish={onFinish}
        initialValues={initialValues}>
        <FormStyled.FormContainer>
          <FormStyled.FormTitle level={1}>Education</FormStyled.FormTitle>
          <FormStyled.FormDescription>Tell students more about the higher education that you've completed or are working on.</FormStyled.FormDescription>

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
              </FormStyled.FormItem>)}
          )}
        </FormStyled.FormContainer>
        <Button type="dashed" onClick={addField}>
          Add another diploma
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


