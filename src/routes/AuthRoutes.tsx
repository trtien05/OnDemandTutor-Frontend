import { Navigate, Outlet } from 'react-router-dom';

import ForgotPassword from '../pages/ForgotPassword';
import Login from '../pages/Login';
import Register from '../pages/Register';
import SetPassword from '../pages/SetPassword';
import config from '../config';
import BecomeTutor from '../pages/BecomeTutor';
// import { useAuth } from '../hooks';

// Authorization
const AuthRouter = () => {
    // const { role } = useAuth();

    // return !role ? <Outlet /> : <Navigate to="/" />;
};

// Define routes for customer
const AuthRoutes = {
    // element: <AuthRouter />,
    children: [
        { path: config.routes.public.login, element: <Login /> },
        { path: config.routes.public.register, element: <Register /> },
        { path: config.routes.public.forgotPassword, element: <ForgotPassword /> },
        { path: config.routes.public.setPassword, element: <SetPassword /> },
        { path: config.routes.public.registerTutor, element: <BecomeTutor /> },
    ],
};

export default AuthRoutes;
