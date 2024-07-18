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
import { rollbackBooking } from '../../../../utils/tutorBookingAPI';

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

const handleDeletePending = async (appointmentId: number, setReloadKey: React.Dispatch<React.SetStateAction<boolean>>) => {
    Modal.confirm({
        title: 'Cancel pending appointment',
        content: 'You are going to cancel this pending appointment. Do you want to proceed?',
        onOk: async () => {
            try {
                await rollbackBooking(appointmentId);
                notification.success({
                    message: 'Success',
                    description: 'Appointment cancelled successfully.',
                });
                setReloadKey(prevKey => !prevKey);
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
            try {
                await updateQuestionStatus(accountId, questionId, newStatus);
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
    )
};
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
export const QuestionColumns: (setReloadKey: React.Dispatch<React.SetStateAction<boolean>>, page: any, pageSize: any) => TableColumnsType<Question> = (setReloadKey, page, pageSize) => [
    {
        title: 'No',
        dataIndex: 'id',
        key: 'index',
        render: (_text, _record, index) => index + 1 + pageSize * (page - 1),
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
        render: (status, record: Question) => (
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
    },
    {
        title: 'Delete',
        dataIndex: 'delete',
        render: (_text: any, record: Question) => (
            <Button
                icon={<DeleteOutlined />}
                onClick={() => handleDelete(record.account.id, record.id, setReloadKey)}
            />
        ),
    },
];
export const PaymentColumns: ( setReloadKey: React.Dispatch<React.SetStateAction<boolean>>, paymentPage: any, paymentPageSize: any) => 
    TableColumnsType<Payment> = (setReloadKey, paymentPage, paymentPageSize) => [
    {
        title: 'No',
        dataIndex: 'id',
        key: 'index',
        render: (_text, _record, index) => index + 1 + paymentPageSize * (paymentPage - 1),
        showSorterTooltip: { target: 'full-header' },
        sorter: (a, b) => a.id - b.id,
        sortDirections: ['ascend', 'descend'],
    },
    {
        title: 'Created At',
        dataIndex: 'createdAt',
        render: (text) => dayjs(text).format('DD-MM-YYYY'),
        defaultSortOrder: 'descend',
        //If true, returns 1, indicating that row a should come after row b.
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
        // If sort by the first timeslot's start time
        sorter: (a, b) => {
            const aStartTime = dayjs(a.timeslots[0].startTime);
            const bStartTime = dayjs(b.timeslots[0].startTime);
            // Checks if the start time of row a is before the start time of row b.
            // If true, returns -1, indicating that row a should come before row b
            // If false, checks if the start time of row a is after the start time of row b.
            // If true, returns 1, indicating that row a should come after row b.
            //If neither is true , returns 0, indicating that the order of these rows doesn't need to change.
            return aStartTime.isBefore(bStartTime) ? -1 : aStartTime.isAfter(bStartTime) ? 1 : 0;
        },
    },
    {
        title: 'Tuition',
        dataIndex: 'tuition',
        render: (tuition) => (
            <Text>
                {tuition.toLocaleString("en-US")}
            </Text>
        ),
        sorter: (a, b) => a.tuition - b.tuition,
    },
    {
        title: 'Status',
        dataIndex: 'status',
        sorter: (a, b) => a.status.localeCompare(b.status),
        render: (status: string, record: Payment) => (
            status !== 'PENDING_PAYMENT' ?
                (<p style={{ color: `${theme.colors.primary}` }}>{status}</p>)
                : (<a style={{ color: `${theme.colors.error}` }} 
                        onClick={() => handleDeletePending(record.id, setReloadKey)}>
                        {status}</a>)
        )
    },
];
