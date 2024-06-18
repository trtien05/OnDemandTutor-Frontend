import { post, get } from '../utils/apiCaller';

export const getTutorDetail = (tutorId: number) => {
    return get(`/api/tutors/${tutorId}/tutor-description`);
};