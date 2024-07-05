import { get } from './apiCaller';

export const getTuitionSum = (date: string) => {
    return get(`/api/statistics/tuition-sum?queryBy=${date}`);
};

export const getTutorCountBySubject = () => {
    return get(`/api/statistics/tutor-count-by-subject`);
};
