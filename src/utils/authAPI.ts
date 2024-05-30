import { post, put } from './apiCaller';

export const register = (account: object) => {
    return post('/api/auth/register', account);
};

export const login = (account: object) => {
    return post('/api/auth/login', account);
};

export const forgotPassword = (emailObj: { email: string }) => {
    return post('/auth/forgot-password', emailObj);
};

export const resetPassword = (resetPasswordData: { token: string; password: string }) => {
    return put('/auth/reset-password', resetPasswordData);
};

export const resendOTP = (email: string) => {
    return post(`/api/auth/send-otp?receiverEmail=${encodeURIComponent(email)}`);
};

export const postOTP = async (email: string, otp: string) => {
    return post(
        `/api/auth/verify-otp?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`,
    );
};

export const loginGoogle = async (tokenObj: { credential: string }) => {
    const body = {
        idToken: tokenObj.credential,
    };
    return post('/api/auth/login-with-google', body);
};
