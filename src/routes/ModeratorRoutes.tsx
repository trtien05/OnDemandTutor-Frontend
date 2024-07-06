import config from "../config";
import { useAuth } from "../hooks";
import ManageTutor from "../pages/Moderator/ManageTutor/ManageTutor";
import ModeratorLayout from "../layouts/ModeratorLayout";
import ManageDocument from "../pages/Moderator/ManageDocument/ManageDocument";


// Authorization
const ModeratorRouter = () => {
    const { role } = useAuth();
    console.log(role)
    // return role === Role.ADMIN ? <AdminLayout /> : <Navigate to="/" />;
    return <ModeratorLayout />;

};

// Define routes for admin
const ModeratorRoutes = {
    path: config.routes.moderator.main,
    element: <ModeratorRouter />,
    children: [
        { path: config.routes.moderator.manageTutor, element: <ManageTutor /> },
        { path: config.routes.moderator.manageDocument, element: <ManageDocument /> },
        // { path: config.routes.admin.manageStudent, element: <Dashboard /> },

    ],
};

export default ModeratorRoutes;
