const routes = {
    public: {
        home: '/',
        login: '/login',
        register: '/register',
        verifyCode: '/verify-code',
        forgotPassword: '/forgot-password',
        setPassword: '/set-password',
        contact: '/contact',
        searchTutors: '/search-tutors',
        tutorDetails: '/search-tutors/:tutorId',
        searchClasses: '/search-classes',
        classDetails: '/search-classes/:classId',
        notFound: '/404',
        searchQuestions: '/search-questions',
    },
    student: {
        profile: '/profile',
        studentSchedule: '/student-schedule',
        makePayment: '/make-payment',
        paymentSuccess: '/confirm-payment',
        registerTutor: '/register-tutor',
    },
    tutor: {
        tutorProfile: '/tutor-profile',
        makePayment: '/make-payment',
        paymentSuccess: '/confirm-payment'
    },
    api: {
        loginGoogle: '/api/auth/callback/google/redirect',
    },
};

export default routes;
