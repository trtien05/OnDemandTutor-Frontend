const routes = {
    public: {
        home: '/',
        login: '/login',
        register: '/register',
        forgotPassword: '/forgot-password',
        setPassword: '/set-password',
        contact: '/contact',
        searchTutors: '/search-tutors',
        tutorDetails: '/search-tutors/:tutorId',
        searchClasses: '/search-classes',
        classDetails: '/search-classes/:classId',
        notFound: '/404',
        createQuestion: '/create-question',
    },
    student: {
        profile: '/profile',
        makePayment: '/make-payment',
        paymentSuccess: '/check-payment',
        registerTutor: '/register-tutor',
    },
    api: {
        loginGoogle: '/auth/callback/google/redirect',
    },
};

export default routes;
