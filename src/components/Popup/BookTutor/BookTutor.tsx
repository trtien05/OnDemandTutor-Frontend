import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Modal, Select, notification } from 'antd';
import * as FormStyled from '../../../pages/BecomeTutor/Form.styled';
import TextArea from 'antd/es/input/TextArea';
// Registering Syncfusion license key
import { registerLicense } from '@syncfusion/ej2-base';
import { createBooking } from '../../../utils/tutorBookingAPI';
import config from '../../../config';
import useAuth from '../../../hooks/useAuth';
import Schedule from '../../Schedule/Schedule';
import { ScheduleEvent } from '../../Schedule/Schedule.type';
import { getTutorById } from '../../../utils/tutorAPI';

registerLicense('Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWXledXVURGdYUE1yXUs=');

interface BookTutorProps {
  tutorId: number;
}

const BookTutor: React.FC<BookTutorProps> = (props) => {
  const { tutorId } = props;
  const { user } = useAuth();
  const accountId = user?.id;
  const [api, contextHolder] = notification.useNotification({
    top: 100,
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleEvent[]>([]);
  const [selectedId, setSelectedId] = useState<number[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  function convertBookingData(values: any) {
    return {
      description: values.description,
      tutorId: tutorId,
      subjectName: values.subjects,
      studentId: accountId,
      timeslotIds: selectedId
    }
  }


  function showModal() {
    if (user) {
      setIsFormOpen(true);
    }
    else navigate(config.routes.public.login);
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await getTutorById(tutorId);
        if (response) {
          await setSubjects(response.data.subjects);
        } else throw new Error("Error fetching tutor data");
      } catch (error: any) {
        api.error({
          message: 'Error',
          description: error.message || 'There was an issue with fetching tutor data. Please try again later.',
        });
      } finally {
        setLoading(false);
      }
    })();
  }, [isFormOpen]);

  const validateTimeslot = (_: unknown) => {
    if (selectedSchedule.length === 0) {
      return Promise.reject("Please select at least one time slot to proceed");
    }
    return Promise.resolve();
  };

  
  const restrictTimeslot = (_: unknown) => {
    if (selectedSchedule.length > 5) {
      selectedSchedule.pop();
      return Promise.reject("You can only select up to 5 time slots");
    }
    return Promise.resolve();
  };

  useEffect(() => {
    form.validateFields(['selectedSlots']);
  }, [selectedSchedule]);

  const handleOk = async (values:any) => {
    setLoading(true); // Set loading state to true when form is submitted
    form.validateFields(['selectedSlots'])
      .then(async () => {
        const bookingData = await convertBookingData(values);
        try {
          if (accountId !== undefined) {
            const response = await createBooking(accountId, bookingData);
            await navigate(config.routes.student.makePayment, { state: { selectedSchedule: selectedSchedule, appointmentData: response.data } });
          } else { console.error("Account ID is undefined") }
        } catch (error: any) {
          api.error({
            message: 'Error create booking',
            description: error.response.data.message || 'There was an issue with creating your booking. Please try again later.',
          });
        } finally {
          setLoading(false);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCancel = () => {
    setIsFormOpen(false);
  };

  return (
    <>
      {contextHolder}
      <Button type="primary" onClick={showModal} style={{ borderRadius: `50px`, fontWeight: `bold` }}>
        Book this tutor
      </Button>
      <Modal
        centered
        closable={false}
        width={'700px'}
        open={isFormOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[<FormStyled.ButtonDiv>
          <Button key="Cancel" type="default" onClick={handleCancel} style={{ marginRight: '5%', width: '45%' }}>
            Cancel
          </Button>
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            loading={loading}
            form='bookTutorForm'
            style={{ marginRight: '2%', width: '45%' }}
          >
            Send
          </Button>
        </FormStyled.ButtonDiv>,]}
        styles={
          {
            content: {
              borderRadius: '50px', padding: '50px', boxShadow: '-3px 7px 71px 30px rgba(185, 74, 183, 0.15)'
            }
          }}
      >
        <FormStyled.FormWrapper
          id='bookTutorForm'
          labelAlign='left'
          layout="vertical"
          requiredMark={false}
          onFinish={handleOk}
          form={form}
          size="middle"
          style={{ rowGap: `10px` }}
          initialValues={{ selectedSlots: new Set<number>() }}
        >
          <FormStyled.FormTitle style={{ margin: `auto`, marginBottom: `0` }}>Tutor Booking</FormStyled.FormTitle>
          <FormStyled.FormItem
            name="selectedSlots"
            rules={[
              {
                validator: validateTimeslot,
                message: "Please select at least one time slot to proceed",
              },
              {
                validator: restrictTimeslot,
                message: "You can only select up to 5 time slots",
              }
            ]}>
            <Schedule tutorId={tutorId} setSelectedId={setSelectedId} setSelectedSchedule={setSelectedSchedule} selectedId={selectedId} selectedSchedule={selectedSchedule} />
          </FormStyled.FormItem>
          <FormStyled.FormItem
            name="subjects"
            $width="100%"
            rules={[
              {
                required: true,
                message: "Please select a subject",
              },
            ]}
            style={{ margin: `-10px 0px` }}
            validateFirst
          >
            <Select size="large" placeholder="Select subject" >
              {subjects.map((subject) => {
                return <Select.Option key={subject} value={subject}>{subject}</Select.Option>
              })}
            </Select>
          </FormStyled.FormItem>
          <FormStyled.FormItem
            name="description"
            $width="100%"
            validateFirst
          >
            <TextArea rows={2} name='description' placeholder="By adding the subject and your special needs, the tutor can know you better and assist you more effectively." />
          </FormStyled.FormItem>
        </FormStyled.FormWrapper>
      </Modal>
    </>
  );
};

export default BookTutor;
