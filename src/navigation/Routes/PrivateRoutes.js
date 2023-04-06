import { ABOUT, ACCOUNT, PROJECTS, DOCUMENTS, TRANSLATE } from "../CONSTANTS"
import { userRoles } from "../../constants/userRoles"
import { DashboardLayout } from "../../components/dashboard/index"
import AccountPage from "../../pages/account/index"
import ProjectPage from "../../pages/projects/index"
import DocumentsPage from "../../pages/documents/index"
import TranslateHystoryPage from "../../pages/translate/index"
import AboutPage from "../../pages/about"

const PrivateRoutes = () => {
    return [
        {
            href: ABOUT,
            role: userRoles.USER,
            element: <AboutPage/>
        },
        {
            href: ACCOUNT,
            role: userRoles.USER,
            element: <AccountPage/>
        },
        {
            href: PROJECTS,
            role: userRoles.USER,
            element: <ProjectPage/>
        },
        {
            href: DOCUMENTS,
            role: userRoles.USER,
            element: <DocumentsPage/>
        }
        ,
        {
            href: TRANSLATE,
            role: userRoles.USER,
            element: <TranslateHystoryPage/>
        }
    ]
};

export default PrivateRoutes
