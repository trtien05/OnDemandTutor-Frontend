import { Navigate } from "react-router-dom";
import config from "../config";
import { useAuth } from "../hooks";
import { Role } from "../utils/enums";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import ManageTutor from "../pages/Admin/ManageTutor/ManageTutor";
import ManageStudent from "../pages/Admin/ManageStudent/ManageStudent";
import ManageModerator from "../pages/Admin/ManageModerator/ManageModerator";
import ManageSalary from "../pages/Admin/ManageSalary/ManageSalary";
import ManageProfitByTutor from "../pages/Admin/ManageReport/ManageProfitByTutor/ManageProfitByTutor";
import ManageProfitByAppointment from "../pages/Admin/ManageReport/ManageProfitByAppointment/ManageProfitByAppointment";
import ManageProfitByStudent from "../pages/Admin/ManageReport/ManageProfitByStudent/ManageProfitByStudent";
import CreateModerator from "../pages/Admin/ManageModerator/CreateModerator";
import ManageAdmin from "../pages/Admin/ManageAdmin";
import CreateAdmin from "../pages/Admin/ManageAdmin/CreateAdmin";


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
        { path: config.routes.admin.manageSalary, element: <ManageSalary /> },
        { path: config.routes.admin.manageReportByTutor, element: <ManageProfitByTutor /> },
        { path: config.routes.admin.manageReportByAppointment, element: <ManageProfitByAppointment /> },
        { path: config.routes.admin.manageReportByStudent, element: <ManageProfitByStudent /> },
        { path: config.routes.admin.createAdmin, element: <CreateAdmin /> },
        { path: config.routes.admin.createModerator, element: <CreateModerator /> },
        { path: config.routes.admin.manageAdmin, element: <ManageAdmin /> },

    ],
};

export default AdminRoutes;
