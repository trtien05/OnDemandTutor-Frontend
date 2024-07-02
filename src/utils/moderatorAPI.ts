import { get, put } from '../utils/apiCaller';

export const getTutorByStatus = (status: string) => {
    return get(`/api/moderators/tutors?status=${status}`);
};

export const approveTutor = (tutorId: number, status:string, data: any) => {
    return put(`/api/moderators/tutors/${tutorId}?status=${status}`, data);
}