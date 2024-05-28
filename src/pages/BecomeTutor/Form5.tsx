import { Col, Checkbox, Form, TimePicker, Button, Grid, Card } from 'antd';
import { useEffect, useState } from 'react';
import { FieldType } from './Form.fields';
import * as FormStyled from './Form.styled';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { theme } from '../../themes';
import styled from 'styled-components';
import dayjs from 'dayjs';

const { useBreakpoint } = Grid;

interface VisibilityState {
  [key: string]: boolean;
}

interface ReviewTimeslotsProps {
  form: FormState;
}

type FormState = {
  [key in keyof VisibilityState]: FieldType[];
};

const getDisabledHours = (day: string, index: number, form: FormState) => {
  const existingTimes = form[day]
    .filter((_, i) => i !== index)
    .map(field => field.initialValue)
    .filter(Boolean);

  let latestEndHour = -1;
  existingTimes.forEach(timeslot => {
    if (timeslot && timeslot[1].hour() > latestEndHour) {
      latestEndHour = timeslot[1].hour();
    }
  });

  return {
    disabledHours: () => {
      if (latestEndHour === -1) return [];
      return Array.from({ length: latestEndHour + 1 }, (_, i) => i);
    },
    disabledMinutes: () => [] // no minutes to disable
  };
};

const Form5 = ({ onFinish, initialValues, onClickBack }: any) => {
  useDocumentTitle('Become a tutor');

  const [visibility, setVisibility] = useState<VisibilityState>({
    'monday': true,
    'tuesday': true,
    'wednesday': true,
    'thursday': true,
    'friday': true,
    'saturday': true,
    'sunday': true,
  })
  const [agreement, setAgreement] = useState<boolean>(false)
  const setVisibilityForDay = (day: string, value: boolean) => {
    setVisibility(prevState => ({ ...prevState, [day]: value }));
  };
  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  const timeslotSelection = (day: string,
    index: number,
    initialValue: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null): FieldType => ({
      key: `${day}_${index}`,
      label: '',
      name: `${day}_timeslot_${index}`,
      rules: [
        {
          required: true,
          message: 'Please select your timeslot for this day.',
        },
      ],
      children: (
        <TimePicker.RangePicker
          size='small'
          format={'HH'}
          value={initialValue}
          id={{
            start: `${day}_${index}_startTime`,
            end: `${day}_${index}_endTime`,
          }}
          onChange={(times) => handleInputChange(day, index, times)}
          disabledTime={() => getDisabledHours(day, index, form)}
          style={{ width: `100%` }}
          changeOnScroll={true} />
      ),
      $width: `90%`,
    })

  const initialFormState = (): FormState => {
    return daysOfWeek.reduce((acc, day) => {
      acc[day as keyof VisibilityState] = [timeslotSelection(day, 0, null)];
      return acc;
    }, {} as FormState);
  };

  //SET UNIQUE INITIAL FORM
  const [form, setForm] = useState<FormState>(initialFormState())
  useEffect(() => {
    setForm(initialFormState());
  }, []);
  // const [form, setForm] = useState<FormState>({
  //   monday: [timeslotSelection('monday', 0)],
  //   tuesday: [timeslotSelection('tuesday', 0)],
  //   wednesday: [timeslotSelection('wednesday', 0)],
  //   thursday: [timeslotSelection('thursday', 0)],
  //   friday: [timeslotSelection('friday', 0)],
  //   saturday: [timeslotSelection('saturday', 0)],
  //   sunday: [timeslotSelection('sunday', 0)],
  // });

  const screens = useBreakpoint()
  const DeleteButton = styled(Button)`
    width: 5px; 
    margin: 16px 0px; 
    padding: 0;
    align-item: center;
    ${({ theme }) => theme.breakpoints.down('sm')}{
      width: 100%;
      margin: 0px auto;
    }
  `
  const ReviewContainer = styled(Card)`
  width: 100%;
  background: ${theme.colors.secondary};
  padding: 5%;
  margin-top: 24px;
  border-radius: 25px;
  
    & .ant-card-body{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    ${({ theme }) => theme.breakpoints.down('xs')}{
      flex-direction: column;
    }
  }
  `

  const TimeslotStyle = styled.div`
    width: 45%;
    ${({ theme }) => theme.breakpoints.down('sm')}{
      width: 100%;
    }
  `

  const addField = (day: string) => {
    setForm(prevState => {
      const newIndex = (prevState[day].length);
      return {
        ...prevState,
        [day]: [...prevState[day], timeslotSelection(day, newIndex, null)],
      };
    });
    console.log(form)
  };

  const removeField = (day: string, formIndex: number) => {
    setForm(prevState => ({
      ...prevState,
      [day]: prevState[day].filter((_, index) => index !== formIndex),
    }));
  };

  const handleInputChange = (
    day: string,
    index: number,
    value: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null
  ) => {
    setForm((prevState) => {
      const updatedFields = prevState[day as keyof FormState].map(
        (field, i) =>
          i === index ? { ...field, initialValue: value } : field
      );
      return { ...prevState, [day]: updatedFields };
    });
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
            <span style={{ fontWeight: `600` }}>Remember that students can book your available times instantly without messaging you first!</span>
          </FormStyled.FormDescription>

          <FormStyled.FormContainer style={{ margin: '0', columnGap: '5%', width: '100%' }}>
            {daysOfWeek.map((day) => (
              <TimeslotStyle key={day}>
                <Form.Item
                  name={day}
                  valuePropName="checked"
                  style={{ margin: '0', width: '100%' }}
                >
                  <FormStyled.FormCheckbox
                    style={{ margin: '0', width: '100%' }}
                    checked={visibility[day]}
                    defaultChecked
                    onChange={(e) => setVisibilityForDay(day, e.target.checked)}
                  >
                    {day.charAt(0).toUpperCase() + day.slice(1)}
                  </FormStyled.FormCheckbox>
                </Form.Item>

                {visibility[day] && form[day].map((field, formIndex) => (
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
                        <DeleteButton type='link' onClick={() => removeField(day, formIndex)} key={`${day}_${formIndex}`}>
                          {screens.xs ? 'Delete Timeslot' : 'X'}
                        </DeleteButton>
                      )}
                    </FormStyled.FormContainer>
                  </div>
                ))}
                {visibility[day] && (
                  <Button type="dashed" onClick={() => addField(day)} key={day}>
                    Add another timeslot
                  </Button>
                )}
              </TimeslotStyle>
            ))}
          </FormStyled.FormContainer>


          <ReviewContainer>
            <FormStyled.FormTitle style={{ fontSize: `24px`, color: `${theme.colors.black}`, marginTop: `-12px` }}>Are you sure you can teach at these times?</FormStyled.FormTitle>
            {Object.keys(form).map((day) => (
              <div key={day} style={{ width: '30%' }}>
                <h4 style={{ marginBottom: '3px' }}>{day.charAt(0).toUpperCase() + day.slice(1)}</h4>
                {form[day as keyof FormState].map((field) => (
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
                checked={agreement}
                onChange={(e) => setAgreement(e.target.checked)}
              >Yes, I'm available at those times.</FormStyled.FormCheckbox>
            </FormStyled.FormItem>
          </ReviewContainer>
        </FormStyled.FormContainer>
        {agreement && (<FormStyled.ButtonDiv>
          <Button type="default" onClick={() => onClickBack(1)} >Back</Button>
          <Button type='primary' htmlType="submit" style={{ marginLeft: `24px` }}>Save and continue</Button>
        </FormStyled.ButtonDiv>)}
      </FormStyled.FormWrapper>
    </Col>
  )
}

export default Form5;


