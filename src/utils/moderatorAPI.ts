import { get, post, put } from '../utils/apiCaller';

export const getTutorByStatus = (status: string) => {
    return get(`/api/moderators/tutors?status=${status}`);
};

export const approveTutor = (tutorId: number, status:string, data: any) => {
    return put(`/api/moderators/tutors/${tutorId}?status=${status}`, data);
}

export const sendEmail = (data: any) => {
    return post(`/api/moderators/send-verification-email`, data);
}