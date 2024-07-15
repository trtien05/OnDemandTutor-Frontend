import { post, get } from '../utils/apiCaller';

export const getTutorSchedule = (tutorId: number) => {
    return get(`/api/schedules/tutors/${tutorId}`);
};

export const createBooking = (studentId: number, booking: any) => {
    return post(`/api/appointments/students/${studentId}`, booking);
};

export const sendBookingEmail = (appointmentId: number) => {
    return post(`/api/appointments/${appointmentId}/send-booking-email`);
}
