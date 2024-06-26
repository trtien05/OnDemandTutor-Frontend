import { Dayjs } from 'dayjs';
import { get, post, put, remove } from './apiCaller';

export const getAppointments = (accountId: number) => {
    return get(`/api/schedules/accounts/${accountId}`);
};

export const reschedule = (appointmentId: number,data: any) => {
    return put(`/api/appointments/${appointmentId}/reschedule`, data);
}