import config from '../config';
import MainLayout from '../layouts/MainLayout';
import NotFound from '../pages/404/404';
import Home from '../pages/Home';
// import Login from '../pages/Login';
import BecomeTutor from '../pages/BecomeTutor';
import SearchTutors from '../pages/SearchTutors/SearchTutors';
import MakePayment from '../pages/Payment/MakePayment';
import PaymentSuccess from '../pages/Payment/PaymentSuccess/PaymentSuccess';
import TutorProfile from '../pages/TutorProfile/TutorProfile';
import SearchQuestions from '../pages/Questions/SearchQuestions';
// import { Navigate, useLocation } from 'react-router-dom';
// import cookieUtils from '../utils/cookieUtils';
import Profile from '../pages/Student/Profile/Profile';
import StudentAppointment from '../pages/Student/Appointment/StudentAppointment';
import TutorDetail from '../pages/TutorDetail';
import TutorAppointment from '../pages/Tutor/Appointment/TutorAppointment';

//* ====================  Authorization for PUBLIC and CUSTOMER ==================== */
const MainRouter = () => {

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
        { path: config.routes.student.studySchedule, element: <StudentAppointment /> },
        { path: config.routes.student.makePayment, element: <MakePayment /> },
        
    ],
};

const tutorRoutes = {
    children: [
        { path: config.routes.tutor.profile, element: <TutorProfile /> },
        { path: config.routes.student.makePayment, element: <MakePayment /> },
        { path: config.routes.student.paymentSuccess, element: <PaymentSuccess /> },
        { path: config.routes.student.studySchedule, element: <StudentAppointment /> },
        { path: config.routes.tutor.teachingSchedule, element: <TutorAppointment /> }
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
