import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomeContainer } from "../pages/Home/HomeContainer";
import SignIn from "../pages/Home/SignIn";
import SignUp from "../pages/Home/SignUp";
import UserHome from "../pages/UserPages/HomePage/index"
import { ROOT, SIGNIN, SIGNUP, HOME } from "./CONSTANTS"
import PrivateRoute from "./PrivateRoute";


export const RouterConfig = () => {
    return (
        <Routes>
            <Route exact path={ROOT} element={ <HomeContainer/>}/>
            <Route exact path={SIGNIN} element={ <SignIn/>}/>   
            <Route exact path={SIGNUP} element={ <SignUp/>}/>  
            <Route exact path={HOME} element={ <PrivateRoute allowedRoles={"User"} element={<UserHome/>}/> }/>
        </Routes>
    )
}
