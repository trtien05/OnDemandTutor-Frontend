import { Navigate } from "react-router-dom";
import config from "../config";
import { useAuth } from "../hooks";
import { Role } from "../utils/enums";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import ManageTutor from "../pages/Admin/ManageTutor/ManageTutor";
import SearchTutors from "../pages/SearchTutors";


// Authorization
const AdminRouter = () => {
    const { role } = useAuth();
    // return role === Role.ADMIN ? <AdminLayout /> : <Navigate to="/" />;
    return <AdminLayout />;

};

// Define routes for admin
const AdminRoutes = {
    path: config.routes.admin.dashboard,
    element: <AdminRouter />,
    children: [
        { path: config.routes.admin.dashboard, element: <Dashboard /> },
        { path: config.routes.admin.manageTutor, element: <ManageTutor /> },
        // { path: config.routes.admin.manageModerator, element: <Dashboard /> },
        // { path: config.routes.admin.manageStudent, element: <Dashboard /> },

    ],
};

export default AdminRoutes;
