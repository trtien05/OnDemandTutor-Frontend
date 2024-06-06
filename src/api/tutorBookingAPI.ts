import { post, get } from '../utils/apiCaller';

export const getTutorSchedule = (tutorId: number) => {
    return get(`/schedules/tutors/${tutorId}`);
};