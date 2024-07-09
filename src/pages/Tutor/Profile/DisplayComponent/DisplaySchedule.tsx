import { Day, ActionEventArgs, EventRenderedArgs, EventSettingsModel, Inject, PopupOpenEventArgs, ScheduleComponent, ViewDirective, ViewsDirective } from '@syncfusion/ej2-react-schedule';
import { registerLicense } from '@syncfusion/ej2-base';
import { useEffect, useState } from 'react';
import * as ScheduleStyle from './Schedule.styled';
import { Schedule as ScheduleData, ScheduleDay, ScheduleEvent } from '../../../../components/Schedule/Schedule.type';
import { getFullSchedule } from '../../../../utils/tutorAPI';

registerLicense("Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWXledXVURGdYUE1yXUs=");


interface ScheduleProps {
  tutorId: number;
  noRestricted?: boolean;
  setSelectedSchedule?: React.Dispatch<React.SetStateAction<ScheduleEvent[]>>;
  setSelectedId?: React.Dispatch<React.SetStateAction<number[]>>;
  selectedId?: number[];
  selectedSchedule?: ScheduleEvent[];
  update?: boolean;
}

const DisplaySchedule: React.FC<ScheduleProps> = ({ tutorId, noRestricted, update }) => {
  const [schedule, setSchedule] = useState<ScheduleData[]>([]);
  const [eventSettings, setEventSettings] = useState<EventSettingsModel>({ dataSource: [] });
 
  const [isScheduleLoaded, setIsScheduleLoaded] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      
    }, 2000); // Adjust this delay as needed
  }, []);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {

        const response = await getFullSchedule(tutorId)
        if (response) {
          //format data    
          const start = new Date();
          while (start.toLocaleString('en-US',{ weekday: 'short'}) !== 'Mon') {
            start.setDate(start.getDate() -1);
          }
          const startDate = new Date(start);
          let newSchedule: ScheduleData[] = [];
          const date = startDate.getDate();
          response.data.schedules.forEach((day: ScheduleDay, dayIndex: number) => {
            const currentDate = startDate;
            currentDate.setDate(date + dayIndex);
            if (day.timeslots.length > 0) {
              day.timeslots.forEach((timeslot) => {
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
        console.error({
          message: 'Error',
          description: error.response ? error.response.data : error.message,
        });
      } finally {
        setTimeout(() => {
          setIsScheduleLoaded(true);

        }, 1000);
      }
    };

    fetchSchedule();
  }, [update]);


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
        RecurrenceRule: "FREQ=WEEKLY;INTERVAL=1;COUNT=5"
      })),
    });
  }, [schedule]);

  const onPopupOpen = (args: PopupOpenEventArgs) => {
    args.cancel = true; // Disable the event popup
  };

  const onActionBegin = (args: ActionEventArgs) => {
    // Cancel new event creation
    if (args.requestType === 'eventCreate' || args.requestType === 'eventChange') {
      args.cancel = true;
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

  if (isScheduleLoaded) return (
    <div>
      <ScheduleStyle.ScheduleWrapper>
        <ScheduleComponent
          key={tutorId} // Add key to force re-render
          // style={{maxHeight: '500px'}}
          height={300}
          
          startHour={start}
          endHour={end}
          eventSettings={{ ...eventSettings, template: eventTemplate }}
          eventClick={() => { }}
          eventRendered={defaultEventRendered}
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

export default DisplaySchedule