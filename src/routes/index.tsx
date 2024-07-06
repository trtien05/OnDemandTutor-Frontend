import AuthRoutes from './AuthRoutes';
import MainRoutes from './MainRoutes';
import ModeratorRoutes from './ModeratorRoutes'
import checkTokenInURL from '../utils/checkTokenInURL';
import { useRoutes } from 'react-router-dom';
import { useScrollToTop } from '../hooks';
import AdminRoutes from './AdminRoutes';

const RoutesComponent = () => {
    useScrollToTop();
    checkTokenInURL();

    return useRoutes([AuthRoutes, MainRoutes, ModeratorRoutes, AdminRoutes]);
};

export default RoutesComponent;
