import { get, put } from './apiCaller';

export const getAppointments = (accountId: number) => {
    return get(`/api/schedules/accounts/${accountId}`);
};

export const reschedule = (appointmentId: number, data: any) => {
    return put(`/api/appointments/${appointmentId}/reschedule`, data);
};

export const getReschedule = (tutorId: number, timeslotId: number) => {
    return get(`/api/schedules/tutors/${tutorId}/old-schedule/${timeslotId}`);
};
export const cancelAppointment = (timeslotId: number, accountId: number) => {
    return put(`/api/appointments/accounts/${accountId}/timeslots/${timeslotId}`);
};

