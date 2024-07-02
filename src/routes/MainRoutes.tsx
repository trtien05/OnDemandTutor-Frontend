import config from '../config';
import MainLayout from '../layouts/MainLayout';
import NotFound from '../pages/404/404';
import Home from '../pages/Home';
import BecomeTutor from '../pages/BecomeTutor';
import SearchTutors from '../pages/SearchTutors/SearchTutors';
import MakePayment from '../pages/Payment/MakePayment';
import PaymentSuccess from '../pages/Payment/PaymentSuccess/PaymentSuccess';
import TutorProfile from '../pages/TutorProfile/TutorProfile';
import SearchQuestions from '../pages/Questions/SearchQuestions';
import Profile from '../pages/Student/Profile/Profile';
import StudentAppointment from '../pages/Student/Appointment/StudentAppointment';
import TutorDetail from '../pages/TutorDetail';
import ChatRoom from '../pages/ChatRoom';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks';
import { Role } from '../utils/enums';

//* ====================  Authorization for PUBLIC and CUSTOMER ==================== */
const MainRouter = () => {
    const { role } = useAuth();

    if (role === Role.ADMIN) return <Navigate to={config.routes.admin.dashboard} />;
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
        { path: config.routes.student.paymentSuccess, element: <PaymentSuccess /> },
        { path: config.routes.student.profile, element: <Profile /> },
        { path: config.routes.student.studentSchedule, element: <StudentAppointment /> },
        { path: config.routes.student.makePayment, element: <MakePayment /> },
        { path: config.routes.student.chatRoom, element: <ChatRoom /> },
    ],
};

const tutorRoutes = {
    children: [
        { path: config.routes.tutor.profile, element: <TutorProfile /> },
        { path: config.routes.student.makePayment, element: <MakePayment /> },
        { path: config.routes.student.paymentSuccess, element: <PaymentSuccess /> },
        { path: config.routes.student.studentSchedule, element: <StudentAppointment /> },
        { path: config.routes.tutor.tutorSchedule, element: <StudentAppointment /> },
        { path: config.routes.student.chatRoom, element: <ChatRoom /> },
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
