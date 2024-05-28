import { post } from './apiCaller';
import {EducationType} from '../pages/BecomeTutor/Form.type';  
export const tutorEducation = (tutorId:number,education: any) => {
    return post(`/api/tutors/${tutorId}/educations`, education);
};

export const tutorDescription = (tutorId:number,description: object) => {
    return post(`/api/tutors/${tutorId}/tutor-description`, description);
};



export const forgotPassword = (emailObj: { email: string }) => {
    return post('/auth/forgot-password', emailObj);
};

export const resetPassword = (resetPasswordData: { token: string; password: string }) => {
    return post('/auth/reset-password', resetPasswordData);
};