import { HOME, ACCOUNT } from "../CONSTANTS"
import { userRoles } from "../../constants/userRoles"
import { DashboardLayout } from "../../components/dashboard/index"
import AccountPage from "../../pages/account/index"

const PrivateRoutes = () => {
    return [
        {
            href: HOME,
            role: userRoles.USER,
            element: <DashboardLayout children={"Welcome to Localiz"}/>
        },
        {
            href: ACCOUNT,
            role: userRoles.USER,
            element: <AccountPage/>
        },
    ]
};

export default PrivateRoutes
