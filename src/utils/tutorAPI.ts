import { get } from './apiCaller';

export const getListTutor = () => {
    return get(`/api/tutors`);
};

export const getTutorById = (tutorId: number) => {
    return get(`/api/tutors/${tutorId}`);
};

export const getTutorReviews = (tutorId: number, pageNo: number, pageSize: number) => {
    return get(`/api/tutors/${tutorId}/reviews?pageNo=${pageNo}&pageSize=${pageSize}`);
};
export const getTutorEducation = (tutorId: number) => {
    return get(`/api/tutors/${tutorId}/educations`);
};
export const getTutorCertification = (tutorId: number) => {
    return get(`/api/tutors/${tutorId}/certificates`);
};
