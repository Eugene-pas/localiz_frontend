import React from "react"
import { useSelector } from "react-redux"
import SignIn from "../pages/Home/SignIn";
import Error404 from "../pages/error/Error404"

const PrivateRoute = props => {
    
    const authReducer = useSelector(state => state.authReducer)
    const { 
        isAuthUser = authReducer.isAuthUser,
        role = authReducer.role, 
        allowedRoles, 
    } = props;

    if (isAuthUser && allowedRoles.includes(role)) {
        return props.element;
    }
    if (isAuthUser && !allowedRoles.includdes(role)) {
        return <Error404/>;
    }
    if (!isAuthUser) {
        return <SignIn />;
    }

    return;
};

export default PrivateRoute
