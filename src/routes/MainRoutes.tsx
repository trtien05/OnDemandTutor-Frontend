import { Navigate } from 'react-router-dom';
import config from '../config';
import MainLayout from '../layouts/MainLayout';
import NotFound from '../pages/404/404';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Tutors from '../pages/Tutors/Tutors';

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
        { path: config.routes.public.searchTutors, element: <Tutors /> },

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
