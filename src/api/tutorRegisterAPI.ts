import { post, put } from '../utils/apiCaller';

export const updateDetails = (accountId: number, account: object) => {
    return put(`/accounts/${accountId}/update-details`, account);
};

export const addEducations = (tutorId: number, educations: any) => {
    return post(`/tutors/${tutorId}/educations`, educations);
};
