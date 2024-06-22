import { Day, ActionEventArgs, EventRenderedArgs, EventSettingsModel, Inject, PopupOpenEventArgs, ScheduleComponent, ViewDirective, ViewsDirective } from '@syncfusion/ej2-react-schedule';
import { registerLicense } from '@syncfusion/ej2-base';
import { useEffect, useState } from 'react';
import * as ScheduleStyle from './Schedule.styled';
import { getTutorSchedule } from '../../utils/tutorBookingAPI';
import { notification } from 'antd';
import { Schedule as ScheduleData, ScheduleDay, ScheduleEvent } from './Schedule.type';

registerLicense('Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWXledXVURGdYUE1yXUs=');


interface ScheduleProps {
  tutorId: number;
  noRestricted?: boolean;
  setSelectedSchedule?: React.Dispatch<React.SetStateAction<ScheduleEvent[]>>;
  setSelectedId?: React.Dispatch<React.SetStateAction<number[]>>;
  selectedId?: number[];
  selectedSchedule?: ScheduleEvent[];
  update?: boolean;
}

const Schedule: React.FC<ScheduleProps> = ({ tutorId, noRestricted, setSelectedId, setSelectedSchedule, selectedId, selectedSchedule, update }) => {
  const [schedule, setSchedule] = useState<ScheduleData[]>([]);
  const [eventSettings, setEventSettings] = useState<EventSettingsModel>({ dataSource: [] });
  const [api, contextHolder] = notification.useNotification({
    top: 100,
  });
  const [isScheduleLoaded, setIsScheduleLoaded] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setIsScheduleLoaded(true);
    }, 1000); // Adjust this delay as needed
  }, []);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {

        const response = await getTutorSchedule(tutorId)
        if (response) {
          //format data    
          const start = new Date(response.data.startDate);
          const today = new Date();
          const startDate = (start.getTime() < today.getTime()) ? today : start;
          let newSchedule: ScheduleData[] = [];

          response.data.schedules.forEach((day: ScheduleDay, dayIndex: number) => {
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + dayIndex);

            if (day.timeslots.length > 0) {
              day.timeslots.forEach((timeslot) => {
                const timeslotStart = new Date(`${currentDate.toISOString().split('T')[0]}T${timeslot.startTime}`);
                if (currentDate.toDateString() === today.toDateString() && timeslotStart.getTime() < today.getTime()) {
                  // If the day is today and the timeslot is before the current moment, skip this timeslot
                  return;
                }

                const value = {
                  id: timeslot.id,
                  scheduleDate: currentDate.toISOString().split('T')[0],
                  startTime: timeslot.startTime.slice(0, 5),
                  endTime: timeslot.endTime.slice(0, 5),
                  isSelected: false
                };
                newSchedule.push(value);
              });
            }
          });

          setSchedule(newSchedule);
        } else throw new Error('Network response was not ok') // Set state once, after processing all schedules

      } catch (error: any) {
        api.error({
          message: 'Error',
          description: error.response ? error.response.data : error.message,
        });
      }
    };

    fetchSchedule();
  }, update?[update]: []);


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
  }, [schedule]);


  useEffect(() => {
    setEventSettings({
      dataSource: schedule.map(s => ({
        Subject: s.startTime,
        Description: `- ${s.endTime}`,
        Id: s.id,
        StartTime: new Date(`${s.scheduleDate}T${s.startTime}`),
        EndTime: new Date(`${s.scheduleDate}T${s.endTime}`),
      })),
    });
  }, [schedule]);


  const today = new Date();
  const next7Days = new Date();
  next7Days.setDate(today.getDate() + 7);

  const onPopupOpen = (args: PopupOpenEventArgs) => {
    args.cancel = true; // Disable the event popup
  };

  const onActionBegin = (args: ActionEventArgs) => {
    // Cancel new event creation
    if (args.requestType === 'eventCreate' || args.requestType === 'eventChange') {
      args.cancel = true;
    }
  };

  const onEventRendered = (args: EventRenderedArgs) => {
    const element = args.element as HTMLElement;
    const eventId = args.data.Id;
    const isSelected = selectedId?.includes(eventId);

    element.style.border = '1px solid #B94AB7'; // Add border to event
    element.style.backgroundColor = isSelected ? '#B94AB7' : '#FFF'; // Change background color if selected
    element.style.color = isSelected ? '#FFF' : '#000'; // Change text color if selected
    element.style.width = '100%';
  };



  const onEventClick = (args: any) => {
    const id = args.event.Id;

    setSchedule(prevSchedule =>
      prevSchedule.map(s =>
        // s.id.toString() === id ? { ...s, isSelected: !s.isSelected } : s
        s.id === id ? { ...s, isSelected: !s.isSelected } : s
      )
    );

    if (setSelectedSchedule) {
      setSelectedSchedule(prevSchedule => {
        if (args && args.event && args.event.Id) {
          if (prevSchedule.some(s => s.Id === args.event.Id)) {
            // If the schedule is already selected, remove it from the selection
            return prevSchedule.filter(schedule => schedule.Id !== args.event.Id);
          } else {
            // If the schedule is not selected, add it to the selection
            return [...prevSchedule, args.event];
          }
        }
        return prevSchedule;
      });
    }


    if (setSelectedId) {
      setSelectedId(prevIds =>
        prevIds.includes(id)
          ? prevIds.filter(i => i !== id)
          : [...prevIds, id]
      );
    }

  };

  const defaultEventRendered = (args: EventRenderedArgs) => {
    const element = args.element as HTMLElement;

    element.style.border = '1px solid #B94AB7'; // Add border to event
    element.style.backgroundColor = '#FFF'; // Change background color if selected
    element.style.color = '#000'; // Change text color if selected
    element.style.width = '100%';
  };

  const eventTemplate = (props: any) => {
    return (
      <div className="e-template-wrap">
        <div className="e-subject">{props.Subject}</div>
        <div className="e-description">{props.Description}</div>
      </div>
    );
  };

  const restrictedTime = !noRestricted
    ? {
      minDate: today,
      maxDate: next7Days,
    }
    : {};


  if (isScheduleLoaded) return (
    <div>
      <ScheduleStyle.ScheduleWrapper>
        <ScheduleComponent
          key={tutorId} // Add key to force re-render
          height="300px"
          selectedDate={today}
          {...restrictedTime}
          startHour={start}
          endHour={end}
          eventSettings={{ ...eventSettings, template: eventTemplate }}

          eventClick={selectedId ? onEventClick : () => { }}
          eventRendered={selectedId ? onEventRendered : defaultEventRendered}
          actionBegin={onActionBegin}
          popupOpen={onPopupOpen}

        >
          <ViewsDirective>
            <ViewDirective option="Day" interval={7} />
          </ViewsDirective>
          <Inject services={[Day]} />
        </ScheduleComponent>
      </ScheduleStyle.ScheduleWrapper>
      {!noRestricted? schedule.length === 0 && (<p style={{ textAlign: 'center' }}>This tutor has no available time slot for the next 7 days</p>): schedule.length === 0 && (<p style={{ textAlign: 'center' }}>Your schedule is currently empty</p>)}
    </div>
  )
}

export default Schedule