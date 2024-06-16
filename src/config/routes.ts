const routes = {
    public: {
        home: '/',
        login: '/login',
        register: '/register',
        verifyCode: '/verify-code',
        forgotPassword: '/forgot-password',
        setPassword: '/set-password',
        contact: '/contact',
        regiterTutor: '/regiter-tutor',
        searchTutors: '/search-tutors',
        tutorDetails: '/search-tutors/:tutorId',
        searchClasses: '/search-classes',
        classDetails: '/search-classes/:classId',
        notFound: '/404',
    },
    student: {
        profile: '/profile',
        makePayment: '/make-payment',
        paymentSuccess: '/check-payment',
        registerTutor: '/register-tutor',
    },
    api: {
        loginGoogle: '/api/auth/callback/google/redirect',
    },
};

export default routes;
