import { Navigate } from "react-router-dom";
import config from "../config";
import { useAuth } from "../hooks";
import ManageTutor from "../pages/Moderator/ManageTutors/ManageTutor";
import ModeratorLayout from "../layouts/ModeratorLayout";


// Authorization
const ModeratorRouter = () => {
    const { role } = useAuth();
    // return role === Role.ADMIN ? <AdminLayout /> : <Navigate to="/" />;
    return <ModeratorLayout />;

};

// Define routes for admin
const ModeratorRoutes = {
    path: config.routes.moderator.manageTutor,
    element: <ModeratorRouter />,
    children: [
        { path: config.routes.moderator.manageTutor, element: <ManageTutor /> },
        // { path: config.routes.admin.manageModerator, element: <Dashboard /> },
        // { path: config.routes.admin.manageStudent, element: <Dashboard /> },

    ],
};

export default ModeratorRoutes;
