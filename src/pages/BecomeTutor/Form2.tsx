import { Col, Button } from 'antd';

import { useState } from 'react';
import { educationForm, FieldType } from './Form.fields';

import * as FormStyled from './Form.styled';

import useDocumentTitle from '../../hooks/useDocumentTitle';

const Form2 = ({ onFinish, initialValues, onClickBack }: any) => {
  useDocumentTitle('Become a tutor');

  //const file = useRef<UploadFile>();
  const [form, setForm] = useState<FieldType[][]>([educationForm]);

  const addField = () => {
    const newFieldKey = (form.length * educationForm.length);
    const newForm: FieldType[] = educationForm.map((field) => ({
      key: (field.key + newFieldKey),
      label: field.label,
      name: `${field.name}_${form.length}`,
      rules: field.rules,
      initialValue: field.initialValue,
      children: field.children,
      $width: field.$width,
    }));
    setForm([...form, newForm]);
    console.log(form)
  };

  const removeField = (formIndex: number) => {
    if (form.length > 1) {
      setForm(form.filter((_, index) => index !== formIndex));
    } else {
      alert('At least one form must be present.');
    }
  };

  return (
    <Col lg={{ span: 12 }} sm={{ span: 16 }} xs={{ span: 24 }} style={{ margin: `auto` }}>

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

          {form.map((form, formIndex) => (
            <div>
              {formIndex > 0 && (
                <Button type='dashed' style={{ width: `100%`, margin: `24px 0px` }}  onClick={() => removeField(formIndex)}>
                  Remove
                </Button>
              )}
            <FormStyled.FormContainer key={formIndex}>
              
              {form.map((field) => (

                <FormStyled.FormItem
                  key={field.key}
                  label={field.label}
                  name={field.name}
                  rules={field.rules}
                  $width={field.$width ? field.$width : '100%'}
                  initialValue={field.initialValue}
                  validateFirst
                >

                  {field.children}
                </FormStyled.FormItem>
              ))}
            </FormStyled.FormContainer>
            </div>
          ))}
          <Button type="dashed" onClick={addField}>
          Add another diploma
          </Button>
        </FormStyled.FormContainer>
        
        <FormStyled.ButtonDiv>
          <Button type="default" onClick={() => onClickBack(1)}>Back</Button>
          <Button type="primary" htmlType="submit" style={{ marginLeft: `24px` }}>Save and continue</Button>
        </FormStyled.ButtonDiv>

      </FormStyled.FormWrapper>
    </Col>
  )
}

export default Form2;


