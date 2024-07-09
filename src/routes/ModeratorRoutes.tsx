import config from "../config";
import { useAuth } from "../hooks";
import ManageTutor from "../pages/Moderator/ManageTutor/ManageTutor";
import ModeratorLayout from "../layouts/ModeratorLayout";
import ManageDocument from "../pages/Moderator/ManageDocument/ManageDocument";
import ManageQuestion from "../pages/Moderator/ManageQuestion/ManageQuestion";
import { Role } from "../utils/enums";
import { Navigate } from "react-router-dom";
import ModeratorMain from "../pages/Moderator/ModeratorMain";


// Authorization
const ModeratorRouter = () => {
    const { role } = useAuth();
    return role == Role.MODERATOR ? <ModeratorLayout /> : <Navigate to="/" />;
};

// Define routes for admin
const ModeratorRoutes = {
    path: config.routes.moderator.main,
    element: <ModeratorRouter />,
    children: [
        {path: config.routes.moderator.main, element: <ModeratorMain />},
        { path: config.routes.moderator.manageTutor, element: <ManageTutor /> },
        { path: config.routes.moderator.manageDocument, element: <ManageDocument /> },
         { path: config.routes.moderator.manageQuestion, element: <ManageQuestion /> },

    ],
};

export default ModeratorRoutes;
