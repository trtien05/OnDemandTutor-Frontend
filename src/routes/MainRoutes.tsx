import config from '../config';
import MainLayout from '../layouts/MainLayout';
import NotFound from '../pages/404/404';
import Home from '../pages/Home';
// import Login from '../pages/Login';
import BecomeTutor from '../pages/BecomeTutor';
import SearchTutors from '../pages/SearchTutors/SearchTutors';
import MakePayment from '../pages/Payment/MakePayment';
import PaymentSuccess from '../pages/Payment/PaymentSuccess/PaymentSuccess';
import TutorProfile from '../pages/Tutor/Profile/TutorProfile';
import SearchQuestions from '../pages/Questions/SearchQuestions';

import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks';
import { Role } from '../utils/enums';
import Profile from '../pages/Student/Profile/Profile';
import StudentAppointment from '../pages/Student/Appointment/StudentAppointment';
import TutorDetail from '../pages/TutorDetail';
import ChatRoom from '../pages/ChatRoom';
import TutorAppointment from '../pages/Tutor/Appointment/TutorAppointment';
import RegisterStatus from '../pages/BecomeTutor/RegisterStatus/RegisterStatus';


//* ====================  Authorization for PUBLIC and CUSTOMER ==================== */
const MainRouter = () => {
    const { role } = useAuth();
    if (role === Role.ADMIN) return <Navigate to={config.routes.admin.dashboard} />;
    if (role === Role.MODERATOR) return <Navigate to={config.routes.moderator.main} />;
    return <MainLayout />;
};


//* ==================== Define children routes: PUBLIC, CUSTOMER, NOT FOUND ==================== */
const publicRoutes = {
    children: [
        { path: config.routes.public.home, element: <Home /> },
        { path: config.routes.public.searchTutors, element: <SearchTutors /> },
        { path: config.routes.student.registerTutor, element: <BecomeTutor /> },
        { path: config.routes.public.searchQuestions, element: <SearchQuestions /> },
        { path: config.routes.public.searchTutors, element: <SearchTutors /> },
        { path: config.routes.public.tutorDetails, element: <TutorDetail /> },
    ],
};

const studentRoutes = {
    children: [
        { path: config.routes.student.registerTutor, element: <BecomeTutor /> },
        { path: config.routes.student.registerStatus, element: <RegisterStatus /> },
        { path: config.routes.student.paymentSuccess, element: <PaymentSuccess /> },
        { path: config.routes.student.profile, element: <Profile /> },
        { path: config.routes.student.studySchedule, element: <StudentAppointment /> },
        { path: config.routes.student.makePayment, element: <MakePayment /> },
        { path: config.routes.student.chatRoom, element: <ChatRoom /> },


    ],
};

const tutorRoutes = {
    children: [
        { path: config.routes.tutor.profile, element: <TutorProfile /> },
        { path: config.routes.student.makePayment, element: <MakePayment /> },
        { path: config.routes.student.paymentSuccess, element: <PaymentSuccess /> },
        { path: config.routes.student.studySchedule, element: <StudentAppointment /> },
        { path: config.routes.tutor.teachingSchedule, element: <TutorAppointment /> },
        { path: config.routes.tutor.chatRoom, element: <ChatRoom /> }

    ],
};

const notFoundRoutes = { path: '*', element: <NotFound /> };

//* ==================== Define main routes ==================== */
const MainRoutes = {
    path: '/',
    element: <MainRouter />,
    children: [publicRoutes, studentRoutes, tutorRoutes, notFoundRoutes],
};

export default MainRoutes;
