import { post, put, get } from '../utils/apiCaller';

export const becomeTutor = (accountId: number) => {
    return put(`/accounts/${accountId}/become-a-tutor`);
};

export const getAccountById = (accountId: number) => {
    return get(`/accounts/${accountId}/profile`);
};

export const updateDetails = (accountId: number, account: any) => {
    return put(`/accounts/${accountId}/update-details`, account);
};

export const addEducations = (tutorId: number, educations: any) => {
    return post(`/tutors/${tutorId}/educations`, educations);
};

export const addCertificates = (tutorId: number, certificates: any) => {
    return post(`/tutors/${tutorId}/certificates`, certificates);
};

export const addTutorDescription = (tutorId: number, description: any) => {
    return post(`/tutors/${tutorId}/tutor-description`, description);
};

export const addAvailableSchedule = (noOfWeeks: number, tutorId: number, schedule: any) => {
    return post(`/schedules/tutors/${tutorId}/add-new-schedule?numberOfWeeks=${noOfWeeks}`, schedule);
}
