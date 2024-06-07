import { post, get } from '../utils/apiCaller';

export const getTutorSchedule = (tutorId: number) => {
    return get(`/schedules/tutors/${tutorId}`);
};

export const createBooking = (studentId: number, booking: any) => {
    return post(`/appointments/students/${studentId}`, booking);
};
