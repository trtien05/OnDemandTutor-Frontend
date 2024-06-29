import { get, put } from './apiCaller';

export const getTutorById = (tutorId: number) => {
    return get(`/api/tutors/${tutorId}`);
};

export const getTutorReviews = (tutorId: number, pageNo: number, pageSize: number) => {
    return get(`/api/tutors/${tutorId}/reviews?pageNo=${pageNo}&pageSize=${pageSize}`);
};
export const getTutorEducation = (tutorId: number, isVerified: boolean) => {
    return get(`/api/tutors/${tutorId}/educations?isVerified=${isVerified}`);
};
export const getTutorCertification = (tutorId: number, isVerified: boolean) => {
    return get(`/api/tutors/${tutorId}/certificates?isVerified=${isVerified}`);
};

export const getTutorDescription = (tutorId: number) => {
    return get(`/api/tutors/${tutorId}/tutor-description`);
};

export const updateTutorDescription = (tutorId: number, requestBody: any) => {
    return put(`/api/tutors/${tutorId}/tutor-description`, requestBody);
};

export const updateSchedule = (tutorId: number, noOfWeeks: number, requestBody: any) => {
    return put(`/api/schedules/tutors/${tutorId}`, requestBody);
};
