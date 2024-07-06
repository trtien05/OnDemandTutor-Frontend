import { TableColumnsType, Typography } from "antd";
import { Question } from "../../../../components/QuestionList/Question.type";
import { Payment, TimeSlot } from "../../../../components/AppointmentList/Appointment.type";
const { Text } = Typography;
import dayjs, { format } from 'dayjs';
function toTimeSlotString(timeSlot: TimeSlot) {
    let timeSlotsString = '';
    const dateString = new Date(timeSlot.scheduleDate).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    timeSlotsString = dateString + " at " + timeSlot.startTime + " - " + timeSlot.endTime;
    return timeSlotsString;
  }
export const QuestionColumns: TableColumnsType<Question> = [
    {
        title: 'No',
        dataIndex: 'id',
        key: 'index',
        render: (text, record, index) => index + 1,
        showSorterTooltip: { target: 'full-header' },
        defaultSortOrder: 'ascend',
        sorter: (a, b) => a.id - b.id,
        sortDirections: ['ascend', 'descend'],
    },
    {
        title: 'Title',
        dataIndex: 'title',
        sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
        title: 'Subject',
        dataIndex: 'subjectName',
        sorter: (a, b) => a.subjectName.localeCompare(b.subjectName),
    },
    {
        title: 'Created At',
        dataIndex: 'createdAt',
        render: (text) => dayjs(text).format('YYYY-MM-DD'),
        sorter: (a, b) => dayjs(a.createdAt).isAfter(dayjs(b.createdAt)) ? 1 : -1,
    },
    {
        title: 'Status',
        dataIndex: 'status',
        sorter: (a, b) => a.status.localeCompare(b.status),
    },
];
export const PaymentColumns: TableColumnsType<Payment> = [
    {
        title: 'No',
        dataIndex: 'id',
        key: 'index',
        render: (text, record, index) => index + 1,
        showSorterTooltip: { target: 'full-header' },
        defaultSortOrder: 'ascend',
        sorter: (a, b) => a.id - b.id,
        sortDirections: ['ascend', 'descend'],
    },
    {
        title: 'Created At',
        dataIndex: 'createdAt',
        render: (text) => dayjs(text).format('YYYY-MM-DD'),
        sorter: (a, b) => dayjs(a.createdAt).isAfter(dayjs(b.createdAt)) ? 1 : -1,
    },
    {
        title: 'Subject',
        dataIndex: 'subjectName',
        sorter: (a, b) => a.subjectName.localeCompare(b.subjectName),
    },
    {
        title: 'Tutor Name',
        dataIndex: ['tutor', 'fullName'],
        sorter: (a, b) => a.tutor.fullName.localeCompare(b.tutor.fullName),
    },
    {
        title: 'Time Slots',
        dataIndex: 'timeslots',
        render: (timeslots) => (
            <div>
                {timeslots.map((slot, index) => (
                    <Text key={index} style={{ display: 'block' }}>
                        {toTimeSlotString(slot)}
                    </Text>
                ))}
            </div>
        ),
        // If you want to sort by the first timeslot's start time
        sorter: (a, b) => {
                const aStartTime = dayjs(a.timeslots[0].startTime);
                const bStartTime = dayjs(b.timeslots[0].startTime);
                return aStartTime.isBefore(bStartTime) ? -1 : (aStartTime.isAfter(bStartTime) ? 1 : 0)
        },
    },
    {
        title: 'Tuition',
        dataIndex: 'tuition',
        sorter: (a, b) => a.tuition - b.tuition,
    },
    {
        title: 'Status',
        dataIndex: 'status',
        sorter: (a, b) => a.status.localeCompare(b.status),
    },
];
