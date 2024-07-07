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
        studySchedule: '/study-schedule',
        makePayment: '/make-payment',
        paymentSuccess: '/confirm-payment',
        registerTutor: '/register-tutor',
        chatRoom: '/chat-room',
    },
    tutor: {
        makePayment: '/make-payment',
        studySchedule: '/study-schedule',
        teachingSchedule: '/teaching-schedule',
        paymentSuccess: '/confirm-payment',
        profile: '/tutor-profile',
        tutorSchedule: '/tutor-schedule',
        chatRoom: '/chat-room',
    },
    admin: {
        dashboard: '/admin',
        manageTutor: '/admin/tutors',
        manageModerator: '/admin/moderator',
        manageStudent: '/admin/student',
    },
    api: {
        loginGoogle: '/api/auth/callback/google/redirect',
    },
};

export default routes;
