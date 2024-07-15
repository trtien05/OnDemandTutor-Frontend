import { get, post, put } from '../utils/apiCaller';

export const getTutorByStatus = (pageNo: number, pageSize: number, status: string) => {
    return get(`/api/moderators/tutors?pageNo=${pageNo}&pageSize=${pageSize}&status=${status}`);
};

export const getTutorWithPendingDocument = (pageNo: number, pageSize: number) => {
    return get(`/api/moderators/documents/tutors?pageNo=${pageNo}&pageSize=${pageSize}`);

}

export const approveTutor = (tutorId: number, status:string, data: any) => {
    return put(`/api/moderators/tutors/${tutorId}?status=${status}`, data);
}

export const sendEmail = (approvalType:string, data: any) => {
    return post(`/api/moderators/send-verification-email?approvalType=${approvalType}`, data);
}

export const approveDocument = (tutorId:number, data: any) => {
    return put(`/api/moderators/documents/${tutorId}`, data);
}

export const getQuestionByStatus = (pageNo: number, pageSize: number, status: string) => {
    return get(`/api/moderators/questions?pageNo=${pageNo}&pageSize=${pageSize}&status=${status}`);
}

export const approveQuestion = (questionId: number, status:string) => {
    return put(`/api/moderators/questions/${questionId}?status=${status}`);
}