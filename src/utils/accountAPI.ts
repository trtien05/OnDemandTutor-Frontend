import { get } from './apiCaller';

export const getInfoCurrentUser = () => {
    return get(`/api/auth/profile`);
};
export const getAccountByRole = (role: string) => {
    return get(`/api/accounts?role=${role}`);
};
