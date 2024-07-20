import { get, put, remove, post } from './apiCaller';

export const getInfoCurrentUser = () => {
    return get(`/api/auth/profile`);
};
export const getAccountByRole = (pageNo: number, pageSize: number, role: string) => {
    return get(`/api/accounts?pageNo=${pageNo}&pageSize=${pageSize}&role=${role}`);
};
export const deleteAccount = (accountId: number) => {
    return remove(`/api/accounts/${accountId}`);
};
export const updateAccount = (accountId: number, accountObject: any) => {
    return put(`/api/accounts/${accountId}/update-details`, accountObject);
};
export const createModerator = (accountObject: any) => {
    return post(`/api/accounts/moderators`, accountObject);
};
export const createAdmin = (accountObject: any) => {
    return post(`/api/accounts/admins`, accountObject);
};
