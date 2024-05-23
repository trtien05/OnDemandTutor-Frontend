import { Col, Button, Checkbox, Form, TimePicker } from 'antd';
import { useEffect, useState } from 'react';
import { availabilityForm, FieldType } from './Form.fields';
import * as FormStyled from './Form.styled';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { theme } from '../../themes';

const Form5 = ({ onFinish, initialValues, onClickBack }: any) => {
  useDocumentTitle('Become a tutor');

  //const file = useRef<UploadFile>();
  const [visibility, setVisibility] = useState<boolean>(false)
  const [form, setForm] = useState<FieldType[][]>();
 useEffect(())
  const addField = (date:string) => {
    const newFieldKey = (form.length * availabilityForm.length);
    const newForm: FieldType[] = availabilityForm.map((field) => ({
      key: (field.key + newFieldKey),
      label: field.label,
      name: `${date}_${field.name}_${form.length}`,
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
    < Col lg={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }} style={{ margin: `auto` }}>
      <FormStyled.FormWrapper
        labelAlign='left'
        layout='vertical'
        requiredMark='optional'
        size='middle'
        onFinish={onFinish}
        initialValues={initialValues}
        >
        <FormStyled.FormContainer>
          <FormStyled.FormTitle level={1}>Availability</FormStyled.FormTitle>
          <FormStyled.FormDescription style={{flexDirection:`column`}}>Availability shows your potential working hours. Students can book your lessons at these times.<br/>
          <span style={{fontWeight:`600`}}>Remember that students can book your available times instantly without messaging you first!</span>
          </FormStyled.FormDescription>

          <Form.Item
        name='agreement'
        valuePropName="checked"
        style={{margin: `0`}}
          >
          <FormStyled.FormCheckbox 
            name='noDate' 
            style={{margin: `0`}}
            checked={visibility}
            onChange={(e) => setVisibility(e.target.checked)}>
              I don’t have relevant certificates.</FormStyled.FormCheckbox>
        </Form.Item>
          {!visibility && form.map((form, formIndex) => (
            <div>
              {formIndex > 0 && (
                <Button type='dashed' style={{ width: `100%`, margin: `24px 0px` }}  onClick={() => removeField(formIndex)}>
                  X
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
        </FormStyled.FormContainer>
        <Button type="dashed" style={{marginTop: `-24px`}}  onClick={() => addField('monday')}>
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

export default Form5;


