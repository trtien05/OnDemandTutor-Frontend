import { get } from '../utils/apiCaller';

export const getTutorByStatus = (status: string) => {
    return get(`/api/moderators/tutors?status=${status}`);
};