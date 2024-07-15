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
        makePayment: '/make-payment', // This can be accessed by both
        studySchedule: '/study-schedule', // This can be accessed by both
        paymentSuccess: '/confirm-payment', // This can be accessed by both
        chatRoom: '/chat-room', // This can be accessed by both
        registerTutor: '/register-tutor', // This can be accessed by both
        registerStatus: '/register-status',
    },
    tutor: {
        profile: '/tutor-profile',
        makePayment: '/make-payment', // This can be accessed by both
        studySchedule: '/study-schedule', // This can be accessed by both
        paymentSuccess: '/confirm-payment', // This can be accessed by both
        teachingSchedule: '/teaching-schedule',
        chatRoom: '/chat-room', // This can be accessed by both
        registerTutor: '/register-tutor', // This can be accessed by both
        withdrawRequest: '/withdraw-request',
    },
    admin: {
        dashboard: '/admin',
        manageTutor: '/admin/tutors',
        manageModerator: '/admin/moderator',
        manageStudent: '/admin/student',
        manageSalary: '/admin/salary',
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
