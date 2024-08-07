import { Dayjs } from 'dayjs';
import { get, put, remove } from './apiCaller';
import { QuestionStatus } from './enums';

interface UpdateAccount {
    fullName: string;
    dateOfBirth: Date | Dayjs | string;
    gender: boolean;
    phoneNumber: string;
    email: string;
    address: string | null;
    avatarUrl?: string;
}

export const getLearnStatistic = (accountId: number) => {
    return get(`/api/statistics/${accountId}/learn-statistics`);
};
export const getPaymentHistory = (accountId: number, pageNo:number, pageSize:number) => {
    return get(`/api/appointments/accounts/${accountId}?pageNo=${pageNo}&pageSize=${pageSize}`);
};
export const getStudentOneQuestion = (accountId: number, questionId: number) => {
    return get(`/api/students/${accountId}/questions/${questionId}`);
};


export const deleteQuestion = (accountId: number, questionId:number) => {
    return remove(`/api/students/${accountId}/questions/${questionId}`);
};

export const getStudentListQuestion = (accountId: number, pageNo:number, pageSize:number) => {
    return get(`/api/students/${accountId}/questions?pageNo=${pageNo}&pageSize=${pageSize}`);
};


export const updateProfile = (accountId: number, updateInfo: UpdateAccount) => {
    return put(`/api/accounts/${accountId}/update-details`, updateInfo);
};

export const updateQuestionStatus = (userId: number, questionId: number, newStatus: QuestionStatus) => {
    return put(`/api/students/${userId}/update-questions-status/${questionId}?status=${newStatus}`);
};
export const updateQuestionContent = (userId: number, questionId: number) => {
    return put(`/api/students/${userId}/questions/${questionId}`);
};
