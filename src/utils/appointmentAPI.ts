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
export const getAppointmentReport = () => {
    return get(`/api/appointments/reports`);
};

export const getStudentReport = (month?: number, year?: number) => {
    let url = '/api/appointments/reports/students';
    if (month && year) {
        url += `?month=${month}&year=${year}`;
    } else if (month) {
        url += `?month=${month}`;
    } else if (year) {
        url += `?year=${year}`;
    }
    return get(url);
};
export const getTutorReport = (month?: number, year?: number) => {
    let url = '/api/appointments/reports/tutors';

    if (month && year) {
        url += `?month=${month}&year=${year}`;
    } else if (month) {
        url += `?month=${month}`;
    } else if (year) {
        url += `?year=${year}`;
    }
    return get(url);
};
