import { get } from './apiCaller';

export const getTutorBooked = (studentId: number) => {
    return get(`/api/students/${studentId}/booked-tutors`);
};
