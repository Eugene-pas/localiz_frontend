import { ROOT, SIGNIN, SIGNUP } from "../CONSTANTS"
import SignIn from "../../pages/Home/SignIn";
import SignUp from "../../pages/Home/SignUp";
import { HomeContainer } from "../../pages/Home/HomeContainer";

const PublicRoutes = () => {
    return [
        {
            href: ROOT,
            element: <HomeContainer />
        },
        {
            href: SIGNIN,
            element: <SignIn />
        },
        {
            href: SIGNUP,
            element: <SignUp />
        },
    ]
};

export default PublicRoutes
