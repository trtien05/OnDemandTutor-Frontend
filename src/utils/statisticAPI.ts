import { get } from './apiCaller';

export const getTuitionSum = (date: string) => {
    return get(`/api/statistics/tuition-sum?queryBy=${date}`);
};
export const getTutorCountBySubject = () => {
    return get(`/api/statistics/tutor-count-by-subject`);
};
export const getTopTutorsByRating = () => {
    return get(`/api/tutors?pageSize=5&sortBy=rating`);
};
export const getRevenueThisMonth = () => {
    return get(`/api/statistics/revenue`);
};
export const getProfitThisMonth = () => {
    return get(`/api/statistics/profit`);
};
export const getNumberOfRole = (role: string) => {
    return get(`/api/statistics/count-by-role?role=${role}`);
};
