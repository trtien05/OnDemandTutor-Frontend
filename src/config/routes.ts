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
    },
    api: {
        loginGoogle: '/auth/callback/google/redirect',
    },
};

export default routes;
