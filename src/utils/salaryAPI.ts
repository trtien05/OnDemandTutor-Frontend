import { get, post, put } from './apiCaller';

export const getWithdrawRequest = () => {
    return get('/api/salary/withdraw-requests');
};

export const changeWithdrawRequest = (withdrawObj: {
    withdrawRequestId: number;
    updatedStatus: string;
}) => {
    return put('/api/salary/withdraw-requests', withdrawObj);
};

export const postTutorSalary = (
    tutorId: number,
    tutorObj: {
        bankAccountNumber: string;
        bankAccountOwner: string;
        bankName: string;
        month: number;
        year: number;
    },
) => {
    return post(`/api/salary/${tutorId}`, tutorObj);
};

export const getTutorSalary = (tutorId: number, month: number, year: number) => {
    return get(`/api/salary/${tutorId}/salary?month=${month}&year=${year}`);
};
