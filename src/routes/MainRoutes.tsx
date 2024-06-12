import { useLocation } from 'react-router-dom';
import config from '../config';
import MainLayout from '../layouts/MainLayout';
import NotFound from '../pages/404/404';
import Home from '../pages/Home';
import Login from '../pages/Login';
import BecomeTutor from '../pages/BecomeTutor';
import Question from '../components/Popup/CreateQuestion/CreateQuestion';
import SearchTutors from '../pages/SearchTutors/SearchTutors';
import MakePayment from '../pages/Payment/MakePayment';
import PaymentSuccess from '../pages/Payment/PaymentSuccess';

//* ====================  Authorization for PUBLIC and CUSTOMER ==================== */
const MainRouter = () => {
    
    return <MainLayout />;
};


//* ==================== Define children routes: PUBLIC, CUSTOMER, NOT FOUND ==================== */
const publicRoutes = {
    children: [
        { path: config.routes.public.home, element: <Home /> },
        
        //
        { path: config.routes.public.searchTutors, element: <SearchTutors /> },

    ],
};

const studentRoutes = {
    children: [
        { path: config.routes.student.registerTutor, element: <BecomeTutor /> },
        {path: config.routes.student.makePayment, element: <MakePayment />},
        {path: config.routes.student.paymentSuccess, element: <PaymentSuccess />}
    ],
};

const studentRoutes = {
    children: [
        { path: config.routes.student.registerTutor, element: <BecomeTutor /> },
        {path: config.routes.student.makePayment, element: <MakePayment />},
        {path: config.routes.student.paymentSuccess, element: <PaymentSuccess />}
    ],
};


const notFoundRoutes = { path: '*', element: <NotFound /> };

//* ==================== Define main routes ==================== */
const MainRoutes = {
    path: '/',
    element: <MainRouter />,
    children: [publicRoutes, studentRoutes, notFoundRoutes],
};

export default MainRoutes;
