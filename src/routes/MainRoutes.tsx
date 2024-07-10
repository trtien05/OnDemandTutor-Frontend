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

import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks';
import { Role } from '../utils/enums';
import Profile from '../pages/Student/Profile/Profile';
import StudentAppointment from '../pages/Student/Appointment/StudentAppointment';
import TutorDetail from '../pages/TutorDetail';
import ChatRoom from '../pages/ChatRoom';
import TutorAppointment from '../pages/Tutor/Appointment/TutorAppointment';
import RegisterStatus from '../pages/BecomeTutor/RegisterStatus/RegisterStatus';


//* ====================  Authorization for PUBLIC ==================== */
const MainRouter = () => {
    const { role } = useAuth();
    const { pathname } = useLocation();

    if (role === Role.ADMIN) return <Navigate to={config.routes.admin.dashboard} />;
    if (role === Role.MODERATOR) return <Navigate to={config.routes.moderator.main} />;

    if (
        !role &&
        (pathname.includes(config.routes.student.registerTutor))
    )
        return <Outlet />;


    return <MainLayout />;
};
const CustomerRouter = () => {
    const { role } = useAuth();
    return role === Role.STUDENT || role === Role.TUTOR ? <Outlet /> : <Navigate to={config.routes.public.login} />;
};

const StudentRouter = () => {
    const { role } = useAuth();
    return role === Role.STUDENT ? <Outlet /> : <Navigate to={config.routes.public.login} />;
};

const TutorRouter = () => {
    const { role } = useAuth();
    return role === Role.TUTOR ? <Outlet /> : <Navigate to={config.routes.public.login} />;
};
//* ==================== Define children routes: PUBLIC, CUSTOMER, STUDENT, TUTOR, NOT FOUND ==================== */
const publicRoutes = {
    children: [
        { path: config.routes.public.home, element: <Home /> },
        { path: config.routes.public.searchTutors, element: <SearchTutors /> },
        { path: config.routes.public.searchQuestions, element: <SearchQuestions /> },
        { path: config.routes.public.searchTutors, element: <SearchTutors /> },
        { path: config.routes.public.tutorDetails, element: <TutorDetail /> },
    ],
};

const customerRoutes = {
    element: <CustomerRouter />,
    children: [
        { path: config.routes.student.makePayment, element: <MakePayment /> },
        { path: config.routes.student.studySchedule, element: <StudentAppointment /> },
        { path: config.routes.student.paymentSuccess, element: <PaymentSuccess /> },
        { path: config.routes.student.chatRoom, element: <ChatRoom /> },
        { path: config.routes.student.registerTutor, element: <BecomeTutor /> },
        { path: config.routes.student.profile, element: <Profile /> },
        { path: config.routes.tutor.studySchedule, element: <StudentAppointment /> },
        { path: config.routes.tutor.makePayment, element: <MakePayment /> },
        { path: config.routes.tutor.paymentSuccess, element: <PaymentSuccess /> },
        { path: config.routes.tutor.chatRoom, element: <ChatRoom /> }
    ]
};

const studentRoutes = {
    element: <StudentRouter />,
    children: [
        { path: config.routes.student.registerStatus, element: <RegisterStatus /> },
    ],
};

const tutorRoutes = {
    element: <TutorRouter />,
    children: [
        { path: config.routes.tutor.profile, element: <TutorProfile /> },
        { path: config.routes.tutor.teachingSchedule, element: <TutorAppointment /> },
    ],
};
const notFoundRoutes = { path: '*', element: <NotFound /> };

//* ==================== Define main routes ==================== */
const MainRoutes = {
    path: '/',
    element: <MainRouter />,
    children: [publicRoutes, customerRoutes, studentRoutes, tutorRoutes, notFoundRoutes],
};

export default MainRoutes;
