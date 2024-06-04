import { Col, Form, Button, Grid, Input } from 'antd';
import { FieldType } from './Form.fields';
import * as FormStyled from './Form.styled';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { theme } from '../../themes';

const { useBreakpoint } = Grid;

const Form5 = ({ onFinish,
  initialValues,
  onClickBack,
  visibility,
  onAddTimeslot,
  onRemoveTimeslot,
  timeslotAgreement,
  onVisibilityChange,
  onTimeslotAgreementChange,
  timeslotForm }: any) => {
  useDocumentTitle('Become a tutor');

  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  const screens = useBreakpoint()
  const validateIntegerInRange = (_: unknown, value: number) => {
    const parsedValue = Number(value);
    if (!(Number.isInteger(parsedValue)) || value < 1 || value > 8) {
      return Promise.reject("Please enter a valid integer between 1 and 8");
    }
    return Promise.resolve();
  };

  return (
    < Col lg={{ span: 12 }} sm={{ span: 16 }} xs={{ span: 24 }} style={{ margin: `auto` }}>
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
          <FormStyled.FormDescription style={{ flexDirection: `column` }}>Availability shows your potential working hours. Students can book your lessons at these times.<br />
            <span style={{ fontWeight: `600` }}>Each timeslot represents a study session between you and the student. You can change this later in your profile session. </span>
          </FormStyled.FormDescription>

          <FormStyled.FormContainer style={{ margin: '0', columnGap: '5%', width: '100%' }}>
            {daysOfWeek.map((day) => (
              <FormStyled.TimeslotStyle key={day}>
                <Form.Item
                  name={day}
                  valuePropName="checked"
                  initialValue={visibility[day]}
                  style={{ margin: '0', width: '100%' }}
                >
                  <FormStyled.FormCheckbox
                    style={{ margin: '0', width: '100%' }}
                    checked={visibility[day]}
                    defaultChecked={visibility[day]}
                    onChange={(e) => onVisibilityChange(day, e.target.checked)}
                  >
                    {day.charAt(0).toUpperCase() + day.slice(1)}
                  </FormStyled.FormCheckbox>
                </Form.Item>

                {visibility[day] && timeslotForm[day].map((field: FieldType, formIndex: number) => (
                  <div style={{ width: '100%' }} key={`${day}_${formIndex}`}>
                    <FormStyled.FormContainer style={{ columnGap: '3%' }} key={formIndex}>
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
                      {formIndex > 0 && (
                        <FormStyled.DeleteButton type='link' onClick={() => onRemoveTimeslot(day, formIndex)} key={`${field.key}_X`}>
                          {screens.xs ? 'Delete Timeslot' : 'X'}
                        </FormStyled.DeleteButton>
                      )}
                    </FormStyled.FormContainer>
                  </div>
                ))}
                {visibility[day] && (
                  <Button type="dashed" onClick={() => onAddTimeslot(day)} key={day}>
                    Add another timeslot
                  </Button>
                )}
              </FormStyled.TimeslotStyle>
            ))}
            <FormStyled.FormItem
              key='noOfWeek'
              label='Number of weeks apply'
              name='noOfWeek'
              rules={[{
                required: true,
                message: 'You must insert in this field'
              },{
                validator: validateIntegerInRange,
                message: 'Please enter a valid integer between 1 and 8'
              }]}
              $width={'100%'}
              validateFirst
            >
              <Input placeholder='3' type='number' max='8' min='1' />
            </FormStyled.FormItem>
          </FormStyled.FormContainer>


          <FormStyled.ReviewContainer>
            <FormStyled.FormTitle style={{ fontSize: `24px`, color: `${theme.colors.black}`, marginTop: `-12px` }}>Are you sure you can teach at these times?</FormStyled.FormTitle>
            {Object.keys(timeslotForm).map((day) => (
              <div key={day} style={{ width: '30%' }}>
                <h4 style={{ marginBottom: '3px' }}>{day.charAt(0).toUpperCase() + day.slice(1)}</h4>
                {timeslotForm[day].map((field: FieldType) => (
                  <li key={field.key}>
                    {field.initialValue
                      ? `${field.initialValue[0]?.format('HH:mm')} - ${field.initialValue[1]?.format(
                        'HH:mm'
                      )}`
                      : ''}
                  </li>
                ))}
              </div>
            ))}
            <FormStyled.FormItem
              name='agreement'
              valuePropName="checked"
              rules={[{
                required: true,
                message: 'You must agree to our Terms and Condition to proceed'
              }]}
              validateFirst
            >
              <FormStyled.FormCheckbox
                name='agreement'
                style={{ margin: `0px`, color: `${theme.colors.black}` }}
                checked={timeslotAgreement}
                defaultChecked={timeslotAgreement}
                onChange={(e) => onTimeslotAgreementChange(e.target.checked)}
              >Yes, I'm available at those times.</FormStyled.FormCheckbox>
            </FormStyled.FormItem>
          </FormStyled.ReviewContainer>
        </FormStyled.FormContainer>
        {timeslotAgreement && (<FormStyled.ButtonDiv>
          <Button type="default" onClick={() => onClickBack(1)} >Back</Button>
          <Button type='primary' htmlType="submit" style={{ marginLeft: `24px` }} >Save and continue</Button>
        </FormStyled.ButtonDiv>)}
      </FormStyled.FormWrapper>
    </Col>
  )
}

export default Form5;


