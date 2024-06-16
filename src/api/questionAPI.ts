import { post, put, get } from '../utils/apiCaller';

export const createQuestion = (studentId: number, question: any) => {
    return post(`/api/students/${studentId}/questions`, question);
};