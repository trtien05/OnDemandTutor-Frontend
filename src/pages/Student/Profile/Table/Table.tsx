import { Button, Modal, notification, TableColumnsType, Typography } from 'antd';
import { Question } from '../../../../components/QuestionList/Question.type';
import { Payment, TimeSlot } from '../../../../components/AppointmentList/Appointment.type';
const { Text } = Typography;
import dayjs from 'dayjs';
import { Key } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { deleteQuestion, updateQuestionStatus } from '../../../../utils/profileAPI';
import { QuestionStatus } from '../../../../utils/enums';
import { theme } from '../../../../themes';

function toTimeSlotString(timeSlot: TimeSlot) {
    let timeSlotsString = '';
    const dateString = new Date(timeSlot.scheduleDate).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    timeSlotsString = dateString + ' at ' + timeSlot.startTime + ' - ' + timeSlot.endTime;
    return timeSlotsString;
}
const handleUpdateStatus = async (questionId: number, accountId: number, currentStatus: QuestionStatus, setReloadKey: React.Dispatch<React.SetStateAction<boolean>>) => {
    if (currentStatus !== QuestionStatus.SOLVED && currentStatus !== QuestionStatus.UNSOLVED) return;
    let newStatus = QuestionStatus.UNSOLVED;
            if (currentStatus === QuestionStatus.UNSOLVED) {
                newStatus = QuestionStatus.SOLVED;
            } 
    Modal.confirm({
        title: 'Confirm Update Status',
        content:
            `Are you sure you want to update status ${currentStatus} to ${newStatus}? You cannot undo this action after confirm.`,
        onOk: async () => {
            
            // let newStatus = QuestionStatus.UNSOLVED;
            // if (currentStatus === QuestionStatus.UNSOLVED) {
            //     newStatus = QuestionStatus.SOLVED;
            // } 
                try {
                    await updateQuestionStatus(accountId, questionId,newStatus);
                    notification.success({
                        message: 'Success',
                        description: 'Question status updated successfully.',
                    });
                    setReloadKey(prevKey => !prevKey); // Trigger reload
                } catch (error: any) {
                    const errorMessage =
                        error.response && error.response.data
                            ? JSON.stringify(error.response.data)
                            : error.message;
                    notification.error({
                        message: 'Error',
                        description: errorMessage,
                    });
                }
            }
        },
)};
const handleDelete = async (accountId: number, questionId: number, setReloadKey: React.Dispatch<React.SetStateAction<boolean>>) => {
    Modal.confirm({
        title: 'Confirm Delete',
        content: 'Are you sure you want to delete this question? You cannot undo this action after confirm.',
        onOk: async () => {
            try {
                await deleteQuestion(accountId, questionId);
                notification.success({
                    message: 'Success',
                    description: 'Question deleted successfully.',
                });
                setReloadKey(prevKey => !prevKey); // Trigger reload
                // Optionally, update the local state or fetch updated data
            } catch (error: any) {
                const errorMessage =
                    error.response && error.response.data
                        ? JSON.stringify(error.response.data)
                        : error.message;
                notification.error({
                    message: 'Error',
                    description: errorMessage,
                });
            }
        },
    });
};
export const QuestionColumns: (setReloadKey: React.Dispatch<React.SetStateAction<boolean>>) => TableColumnsType<Question> = (setReloadKey) => [
    {
        title: 'No',
        dataIndex: 'id',
        key: 'index',
        render: (_text, _record, index) => index + 1,
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
        sorter: (a, b) => (dayjs(a.createdAt).isAfter(dayjs(b.createdAt)) ? 1 : -1),
    },
    {
        title: 'Status',
        dataIndex: 'status',
        sorter: (a, b) => a.status.localeCompare(b.status),
        render: (status, record:Question) => (
            <Button
                type="link"
                onClick={() => handleUpdateStatus(record.id, record.account.id, record.status as QuestionStatus, setReloadKey)}
            >
                {status}
            </Button>
        ),
    },
    {
        title: 'View',
        key: 'view',
        // render: (_text, _record) => (
        //     <Button icon={<EyeOutlined />} onClick={() => handleView(record)} />
        // ),
        
    },
    {
        title: 'Delete',
        dataIndex: 'delete',
        render: (_text: any,record:Question) => (
            <Button
                icon={<DeleteOutlined />}
                onClick={() => handleDelete(record.account.id, record.id,setReloadKey)}
            />
        ),
    },
];
export const PaymentColumns: TableColumnsType<Payment> = [
    {
        title: 'No',
        dataIndex: 'id',
        key: 'index',
        render: (_text, _record, index) => index + 1,
        showSorterTooltip: { target: 'full-header' },
        defaultSortOrder: 'ascend',
        sorter: (a, b) => a.id - b.id,
        sortDirections: ['ascend', 'descend'],
    },
    {
        title: 'Created At',
        dataIndex: 'createdAt',
        render: (text) => dayjs(text).format('YYYY-MM-DD'),
        sorter: (a, b) => (dayjs(a.createdAt).isAfter(dayjs(b.createdAt)) ? 1 : -1),
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
                {timeslots.map((slot: TimeSlot, index: Key | null | undefined) => (
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
            return aStartTime.isBefore(bStartTime) ? -1 : aStartTime.isAfter(bStartTime) ? 1 : 0;
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
        render: (status) => (
            <p style={{color:`${theme.colors.primary}`}}>{status}</p>
        )
    },
];
