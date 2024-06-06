import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'antd';
import * as FormStyled from '../../../pages/BecomeTutor/Form.styled';
import { Day, ActionEventArgs, EventRenderedArgs, EventSettingsModel, Inject, PopupOpenEventArgs, ScheduleComponent, ViewDirective, ViewsDirective } from '@syncfusion/ej2-react-schedule';
import TextArea from 'antd/es/input/TextArea';
// Registering Syncfusion license key
import { registerLicense } from '@syncfusion/ej2-base';
import * as ScheduleStyle from './BookTutor.styled';
import { get } from '../../../utils/apiCaller';
import moment from 'moment';
import { getTutorSchedule } from '../../../api/tutorBookingAPI';

registerLicense('Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWXledXVURGdYUE1yXUs=');

interface Schedule {
  id: number;
  scheduleDate: string;
  startTime: string;
  endTime: string;
}

const BookTutor: React.FC = () => {
  const tutorId = 1;
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const [selectedId, setSelectedId] = useState<string[]>([]);
  const [eventSettings, setEventSettings] = useState<EventSettingsModel>({ dataSource: [] });
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchSchedule = async () => {
      try {

        const response =
          await getTutorSchedule(tutorId)
            .catch(error => {
              console.error('Error saving account details:', error);
            });;
            
        //format data    
        const startDate = new Date(response.data.startDate);
        let newSchedule: Schedule[] = [];
        response.data.schedules.forEach((day, dayIndex: number) => {
          const currentDate = new Date(startDate);
          currentDate.setDate(startDate.getDate() + dayIndex);
          if (day.timeslots.length > 0) {
            day.timeslots.forEach((timeslot) => {
              const value = {
                id: timeslot.id,
                scheduleDate: currentDate.toISOString().split('T')[0],
                startTime: timeslot.startTime.slice(0, 5),
                endTime: timeslot.endTime.slice(0, 5),
              };

              newSchedule.push(value);
            });
          }
        });

        setSchedule(newSchedule); // Set state once, after processing all schedules
        console.log(newSchedule);

      } catch (error) {
        console.error('Failed to fetch schedule', error);
      }
    };

    fetchSchedule();
  }, []);

  const [start, setStart] = useState<string>('');
  const [end, setEnd] = useState<string>('');

  useEffect(() => {
    if (schedule.length === 0) return;

    const timeRange = () => {
      let earliest: string = '23:59';
      let latest: string = '00:00';

      schedule.forEach(s => {
        if (s.startTime < earliest) {
          earliest = s.startTime;
        }

        if (s.endTime > latest) {
          latest = s.endTime;
        }
      });

      setStart(earliest);
      setEnd(latest);
    };

    timeRange();
    console.log(end)
  }, [schedule]);


  useEffect(() => {
    setEventSettings({
      dataSource: schedule.map(s => ({
        Subject: s.startTime,
        Description: `- ${s.endTime}`,
        Id: s.id.toString(),
        StartTime: new Date(`${s.scheduleDate}T${s.startTime}`),
        EndTime: new Date(`${s.scheduleDate}T${s.endTime}`),
      })),
    });
  }, [schedule]);

  const today = new Date();
  const next7Days = new Date();
  next7Days.setDate(today.getDate() + 6);

  const onEventRendered = (args: EventRenderedArgs) => {
    const element = args.element as HTMLElement;
    const eventId = args.data.Id;
    const isSelected = selectedId.includes(eventId);

    element.style.border = '1px solid #B94AB7'; // Add border to event
    element.style.backgroundColor = isSelected ? '#B94AB7' : '#FFF'; // Change background color if selected
    element.style.color = isSelected ? '#FFF' : '#000'; // Change text color if selected
    element.style.width = '100%';
  };

  const onEventClick = (args: any) => {
    const id = args.event.Id;

    setSchedule(prevSchedule =>
      prevSchedule.map(s =>
        s.id.toString() === id ? { ...s, isSelected: !s.isSelected } : s
      )
    );

    setSelectedId(prevIds =>
      prevIds.includes(id)
        ? prevIds.filter(i => i !== id)
        : [...prevIds, id]
    );
    console.log(args.event);
    console.log(schedule);
    console.log(selectedId);
  };

  const onPopupOpen = (args: PopupOpenEventArgs) => {
    args.cancel = true; // Disable the event popup
  };

  const onActionBegin = (args: ActionEventArgs) => {
    // Cancel new event creation
    if (args.requestType === 'eventCreate' || args.requestType === 'eventChange') {
      args.cancel = true;
    }
  };

  const eventTemplate = (props: any) => {
    return (
      <div className="e-template-wrap">
        <div className="e-subject">{props.Subject}</div>
        <div className="e-description">{props.Description}</div>
      </div>
    );
  };

  const subjects = [
    { label: "Mathematics", value: "Mathematics" },
    { label: "Chemistry", value: "Chemistry" },
    { label: "Biology", value: "Biology" },
    { label: "Literature", value: "Literature" },
    { label: "English", value: "English" },
    { label: "IELTS", value: "IELTS" },
    { label: "TOEFL", value: "TOEFL" },
    { label: "TOEIC", value: "TOEIC" },
    { label: "Physics", value: "Physics" },
    { label: "Geography", value: "Geography" },
    { label: "History", value: "History" },
    { label: "Coding", value: "Coding" },
  ];

  const showModal = () => {
    setIsFormOpen(true);
  };

  const handleOk = () => {
    setLoading(true); // Set loading state to true when form is submitted
    const values = form.getFieldValue('description')
    console.log(values);
    console.log(selectedId)
    setLoading(false); // Set loading state back to false when form submission is complete

  };

  const handleCancel = () => {
    setIsFormOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Book this tutor
      </Button>
      <Modal
        centered
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
            onClick={handleOk}
            loading={loading}
            form="myForm" //because not the direct descendant of the Form component, so the htmlType="submit" won't work.
            style={{ marginRight: '2%', width: '45%' }}
          >
            Send
          </Button>
        </FormStyled.ButtonDiv>,]}
        styles={
          {
            content: {
              borderRadius: '100px', padding: '50px', boxShadow: '-3px 7px 71px 30px rgba(185, 74, 183, 0.15)'
            }
          }}
      >
        <FormStyled.FormWrapper
          labelAlign='left'
          layout="vertical"
          requiredMark={false}
          form={form}
          size="middle"
          style={{ rowGap: `10px` }}
          initialValues={{ selectedSlots: new Set<number>() }}
        >
          <FormStyled.FormTitle style={{ margin: `auto`, marginBottom: `0` }}>Tutor Booking</FormStyled.FormTitle>
          <ScheduleStyle.ScheduleWrapper>
            <ScheduleComponent
              key={JSON.stringify(eventSettings.dataSource)} // Add key to force re-render
              height="300px"
              selectedDate={today}
              minDate={today}
              maxDate={next7Days}
              startHour={start}
              endHour={end}
              eventSettings={{ ...eventSettings, template: eventTemplate }}
              actionComplete={() => { }}
              eventRendered={onEventRendered}
              eventClick={onEventClick}
              actionBegin={onActionBegin}
              popupOpen={onPopupOpen}
            >
              <ViewsDirective>
                <ViewDirective option="Day" interval={7} />
              </ViewsDirective>
              <Inject services={[Day]} />
            </ScheduleComponent>
          </ScheduleStyle.ScheduleWrapper>
          <FormStyled.FormItem
            name="description"
            rules={[
              {
                required: false,
                message: "Please select the subject",
              },
            ]}
            $width="100%"
            validateFirst
          >
            <TextArea rows={2} name='description' placeholder="By adding the subject and your special needs, the tutor can know you better and assist you more effectively." />
          </FormStyled.FormItem>
          {/* <FormStyled.ButtonDiv>
          <Button type="default" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginLeft: `24px` }}
          >
            Book
          </Button>
        </FormStyled.ButtonDiv> */}
        </FormStyled.FormWrapper>
      </Modal>
    </>
  );
};

export default BookTutor;
