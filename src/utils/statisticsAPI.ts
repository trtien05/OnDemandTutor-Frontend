import { get } from '../utils/apiCaller';

export const getTeachStatistics = (tutorId: number) => {
    return get(`/api/statistics/${tutorId}/teach-statistics`);
};
