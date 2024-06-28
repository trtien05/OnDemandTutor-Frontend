import { get } from '../utils/apiCaller';

export const getPaymentUrl = (appointment: any) => {
    return get(`/api/payment/create-payment`, appointment);
};

export const getTutorInfo = (tutorId: number) => {
    return get(`/api/tutors/${tutorId}`);
};

export const getTutorEducation = (tutorId: number) => {
    return get(`/api/tutors/${tutorId}/educations`);
};
export const checkPaymentStatus = (payment: any) => {
    return get(`/api/payment/check-payment/vnpay${payment}`);
};
