import { HOME } from "../CONSTANTS"
import { userRoles } from "../../constants/userRoles"
import { DashboardLayout } from "../../pages/Home/Dashboard/HomePage/index"

const PrivateRoutes = () => {
    return [
        {
            href: HOME,
            role: userRoles.USER,
            element: <DashboardLayout children={"Welcome to Localiz"}/>
        }
    ]
};

export default PrivateRoutes
