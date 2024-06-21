import { Navigate } from 'react-router-dom';
import config from '../config';
import MainLayout from '../layouts/MainLayout';
import NotFound from '../pages/404/404';
import Home from '../pages/Home';
import Login from '../pages/Login';
import BecomeTutor from '../pages/BecomeTutor';
import SearchTutors from '../pages/SearchTutors/SearchTutors';
import MakePayment from '../pages/Payment/MakePayment';
import TutorDetail from '../pages/TutorDetail';
import PaymentSuccess from '../pages/Payment/PaymentSuccess/PaymentSuccess';
import SearchQuestions from '../pages/Questions/SearchQuestions';
import { Navigate, useLocation } from 'react-router-dom';
import cookieUtils from '../utils/cookieUtils';
import Profile from '../pages/Customer/Profile/Profile';

//* ====================  Authorization for PUBLIC and CUSTOMER ==================== */
const MainRouter = () => {
    // const { pathname } = useLocation();
    // const { role } = useAuth();

    // if (role === Role.ADMIN) return <Navigate to={config.routes.admin.dashboard} />;
    // if (role === Role.STAFF) return <Navigate to={config.routes.staff.home} />;

    // if (
    //     !role &&
    //     (pathname.includes(config.routes.customer.purchased) ||
    //         pathname.includes(config.routes.customer.schedule))
    // )
    //     return <Outlet />;

    // if (pathname === config.routes.customer.orderSuccess) {
    //     const payment = cookieUtils.getItem(config.cookies.payment);

    //     if (!payment) {
    //         return <Navigate to={config.routes.public.home} />;
    //     }
    // }
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
        { path: config.routes.student.makePayment, element: <MakePayment /> },
        { path: config.routes.student.paymentSuccess, element: <PaymentSuccess /> },
        { path: config.routes.student.profile, element: <Profile/> }
    ],
};


const notFoundRoutes = { path: '*', element: <NotFound /> };

//* ==================== Define main routes ==================== */
const MainRoutes = {
    path: '/',
    element: <MainRouter />,
    children: [publicRoutes, notFoundRoutes],
};

export default MainRoutes;
