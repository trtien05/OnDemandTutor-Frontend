import { post, put } from './apiCaller';

export const register = (account: object) => {
    return post('/auth/register', account);
};

export const login = (account: object) => {
    return post('/auth/login', account);
    // return post('/api/auth/login', account);
};

export const forgotPassword = (emailObj: { email: string }) => {
    return post('/auth/forgot-password', emailObj);
};

export const resetPassword = (resetPasswordData: { token: string; password: string }) => {
    return put('/auth/reset-password', resetPasswordData);
};
