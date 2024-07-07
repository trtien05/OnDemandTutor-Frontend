import { get, post, put } from './apiCaller';

export const getTutorList = () => {
    return get(`/api/tutors?pageNo=0&pageSize=3&sortBy=rating`);
};

export const getListTutor = () => {
    return get(`/api/tutors`);
};

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

export const updateSchedule = (tutorId: number, requestBody: any) => {
    return put(`/api/schedules/tutors/${tutorId}`, requestBody);
};

export const getTutorStatistic = (tutorId: number) => {
    return get(`/api/statistics/${tutorId}/teach-statistics`);
};

export const addTimeslot = (tutorId: number, requestBody: any) => {
    return post(`/api/schedules/tutors/${tutorId}/timeslots`, requestBody);
};

export const getFullSchedule = (tutorId: number) => {
    return get(`/api/schedules/${tutorId}/profile-schedule`);
};

export const postTutorReviews = (tutorId: number, requestBody: any) => {
    return post(`/api/tutors/${tutorId}/reviews`, requestBody);
};

export const getStatusReviews = (tutorId: number, studentId: number) => {
    return get(`/api/tutors/${tutorId}/students/${studentId}`);
};
