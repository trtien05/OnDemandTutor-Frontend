import { post } from './apiCaller';

export const tutorDescription = (tutorId:number,description: object) => {
    return post(`/api/tutors/${tutorId}/tutor-description`, description);
};

export const tutorEducation = (account: object) => {
    return post('/api/auth/login', account);
};

export const forgotPassword = (emailObj: { email: string }) => {
    return post('/auth/forgot-password', emailObj);
};

export const resetPassword = (resetPasswordData: { token: string; password: string }) => {
    return post('/auth/reset-password', resetPasswordData);
};