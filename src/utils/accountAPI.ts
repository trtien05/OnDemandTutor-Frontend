import { get, put, remove } from './apiCaller';

export const getInfoCurrentUser = () => {
    return get(`/api/auth/profile`);
};
export const getAccountByRole = (role: string) => {
    return get(`/api/accounts?role=${role}`);
};
export const deleteAccount = (accountId: number) => {
    return remove(`/api/accounts/${accountId}`);
};
export const updateAccount = (accountId: number, accountObject: any) => {
    return put(`/api/accounts/${accountId}/update-details`, accountObject);
};
