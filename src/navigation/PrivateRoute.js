import React from "react"
import { useSelector } from "react-redux"
import SignIn from "../pages/Home/SignIn";

const PrivateRoute = props => {
    const userReducer = useSelector(state => state.userReducer)
    const { 
        isAuthUser = userReducer.isAuthUser,
        role = userReducer.role, 
        allowedRoles, 
    } = props;

    if (isAuthUser && allowedRoles.includes(role)) {
        return props.element;
    }
    if (isAuthUser && !allowedRoles.includes(role)) {
        return (
            <h1>403 - You are not allowed to see this page.</h1>
        );
    }
    if (!isAuthUser) {
        return <SignIn/>
    }

    return;
};

export default PrivateRoute
