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
        profile: '/profile', // This can be accessed by both
        makePayment: '/make-payment',
        studySchedule: '/study-schedule',
        paymentSuccess: '/confirm-payment',
        chatRoom: '/chat-room',
        registerTutor: '/register-tutor',
        registerStatus: '/register-status',
    },
    tutor: {
        profile: '/tutor-profile',
        makePayment: '/make-payment',
        studySchedule: '/study-schedule',
        paymentSuccess: '/confirm-payment',
        teachingSchedule: '/teaching-schedule',
        chatRoom: '/chat-room',
        registerTutor: '/register-tutor',
    },
    admin: {
        dashboard: '/admin',
        manageTutor: '/admin/tutors',
        manageModerator: '/admin/moderator',
        manageStudent: '/admin/student',
    },
    moderator: {
        main: '/moderator',
        manageTutor: 'tutors',
        manageQuestion: 'questions',
        manageDocument: 'documents',
    },
    api: {
        loginGoogle: '/api/auth/callback/google/redirect',
    },
};

export default routes;
