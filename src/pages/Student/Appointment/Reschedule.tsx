import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Modal, notification } from 'antd';
import * as FormStyled from '../../../pages/BecomeTutor/Form.styled';
import config from '../../../config';
import useAuth from '../../../hooks/useAuth';
import Schedule from '../../../components/Schedule/Schedule';
import { ScheduleEvent } from '../../../components/Schedule/Schedule.type';
import { reschedule } from '../../../utils/appointmentAPI';
import { TimeSlot } from '../../../components/AppointmentList/Appointment.type';
import { theme } from '../../../themes';
import { CalendarOutlined } from '@ant-design/icons';

interface RescheduleProps {
  tutorId: number;
  oldBooking: TimeSlot;
}

const Reschedule: React.FC<RescheduleProps> = (props) => {
  const tutorId = props.tutorId;
  const { user } = useAuth();
  const accountId = user?.id;
  const [api, contextHolder] = notification.useNotification({
    top: 100,
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleEvent[]>([]);
  const [selectedId, setSelectedId] = useState<number[]>([props.oldBooking.timeslotId]);
  const [rescheduleAgreement, setRescheduleAgreement] = useState<boolean>(false)
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  function convertRescheduleData() {
    return {
      oldTimeslotId: props.oldBooking.timeslotId,
      newWeeklyScheduleId: selectedId[1],
    }
  }


  function showModal() {
    if (user) {
      setIsFormOpen(true);
    }
    else navigate(config.routes.public.login);
  };

  const validateTimeslot = (_: unknown) => {
    if (selectedSchedule.length < 1) {
      return Promise.reject("Please select at least one time slot to proceed");
    }
    return Promise.resolve();
  };


  const restrictTimeslot = (_: unknown) => {
    if (selectedSchedule.length > 1) {
      selectedSchedule.pop();
      return Promise.reject("You can only select one time slot");
    }
    return Promise.resolve();
  };

  useEffect(() => {
    form.validateFields(['selectedSlots']);
  }, [selectedSchedule]);

  const handleOk = async () => {
    setLoading(true); // Set loading state to true when form is submitted
    form.validateFields(['selectedSlots'])
      .then(async () => {
        setLoading(true)
        const rescheduleData = await convertRescheduleData();
        try {
          if (accountId !== undefined) {
            const response = await reschedule(props.oldBooking.appointment.id, rescheduleData);
            if (response.status === 200) {
              api.success({
                message: 'Your appointment has been rescheduled'
              });
              setIsFormOpen(false);
              setLoading(false);
            }
          } else { console.error("Account ID is undefined") }
        } catch (error: any) {
          api.error({
            message: 'Error create booking',
            description: error.message || 'There was an issue with creating your booking. Please try again later.',
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
      <Button type="link" onClick={showModal} >
        <CalendarOutlined style={{ fontSize: '30px', cursor: 'pointer' }}/>
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
            disabled={!rescheduleAgreement}
            loading={loading}
            form='rescheduleForm'
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
          id='rescheduleForm'
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
                message: "You can only select one time slot",
              }
            ]}>
            <Schedule tutorId={tutorId}
              setSelectedId={setSelectedId}
              setSelectedSchedule={setSelectedSchedule}
              selectedId={selectedId}
              selectedSchedule={selectedSchedule}
              maxSlots={2}
              restrictedTime={24}
              scheduleType='reschedule'
            />
          </FormStyled.FormItem>
          <FormStyled.FormDescription style={{marginBottom:`0px`}}>
            We will not refund for any fewer hours than the original booking.<br/>
            Please make sure to select the appropriate time slot.
          </FormStyled.FormDescription>
          <FormStyled.FormItem
            name='agreement'
            valuePropName="checked"
            rules={[{
              required: true,
              message: 'You must confirm your timeslots to proceed'
            }]}
            validateFirst
          >
            <FormStyled.FormCheckbox
              name='agreement'
              style={{ margin: `0px`, color: `${theme.colors.black}` }}
              checked={rescheduleAgreement}
              defaultChecked={rescheduleAgreement}
              onChange={(e) => setRescheduleAgreement(e.target.checked)}
            > I have acknowledged all possible losts and agreed to the reschedule.
            </FormStyled.FormCheckbox>
          </FormStyled.FormItem>
        </FormStyled.FormWrapper>
      </Modal>
    </>
  );
};

export default Reschedule;
