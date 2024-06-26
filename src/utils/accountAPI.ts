import { get } from './apiCaller';

export const getInfoCurrentUser = () => {
    return get(`/api/auth/profile`);
};
