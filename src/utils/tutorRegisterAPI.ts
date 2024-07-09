import { post, put, get } from '../utils/apiCaller';

export const becomeTutor = (accountId: number) => {
    return put(`/api/accounts/${accountId}/become-a-tutor`);
};

export const getAccountById = (accountId: number) => {
    return get(`/api/accounts/${accountId}`);
};

export const updateDetails = (accountId: number, account: any) => {
    return put(`/api/accounts/${accountId}/update-details`, account);
};

export const addEducations = (tutorId: number, educations: any) => {
    return post(`/api/tutors/${tutorId}/educations`, educations);
};

export const addCertificates = (tutorId: number, certificates: any) => {
    return post(`/api/tutors/${tutorId}/certificates`, certificates);
};

export const addTutorDescription = (tutorId: number, description: any) => {
    return post(`/api/tutors/${tutorId}/tutor-description`, description);
};

export const addAvailableSchedule = ( tutorId: number, schedule: any) => {
    return post(`/api/schedules/tutors/${tutorId}/timeslots`, schedule);
};
