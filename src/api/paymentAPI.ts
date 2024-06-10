import { post, get } from '../utils/apiCaller';

export const getTutorInfo = (tutorId: number) => {
    return get(`/tutors/${tutorId}`);
};

export const getTutorEducation = (tutorId: number) => {
    return get(`/tutors/${tutorId}/educations`);
}

