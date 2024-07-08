import { Navigate } from "react-router-dom";
import config from "../config";
import { useAuth } from "../hooks";
import { Role } from "../utils/enums";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import ManageTutor from "../pages/Admin/ManageTutor/ManageTutor";
import ManageStudent from "../pages/Admin/ManageStudent/ManageStudent";
import ManageModerator from "../pages/Admin/ManageModerator/ManageModerator";


// Authorization
const AdminRouter = () => {
    const { role } = useAuth();
    return role === Role.ADMIN ? <AdminLayout /> : <Navigate to="/" />;

};

// Define routes for admin
const AdminRoutes = {
    path: config.routes.admin.dashboard,
    element: <AdminRouter />,
    children: [
        { path: config.routes.admin.dashboard, element: <Dashboard /> },
        { path: config.routes.admin.manageTutor, element: <ManageTutor /> },
        { path: config.routes.admin.manageModerator, element: <ManageModerator /> },
        { path: config.routes.admin.manageStudent, element: <ManageStudent /> },

    ],
};

export default AdminRoutes;
