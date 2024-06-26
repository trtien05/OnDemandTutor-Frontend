import { Dayjs } from 'dayjs';
import { get, post, put, remove } from './apiCaller';

export const getAppointments = (accountId: number) => {
    return get(`/api/schedules/accounts/${accountId}`);
};