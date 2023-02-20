import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Error404 from "../pages/error/Error404"
import PublicRoutes from "./Routes/PublicRoutes";
import PrivateRoutes from "./Routes/PrivateRoutes";

export const RouterConfig = () => {
    return (
        <Routes>
            {PublicRoutes().map((route) => (
                <Route key={route} path={route.href} element={route.element} />
            ))}
            {PrivateRoutes().map((route) => (
                <Route key={route} path={route.href} element={
                <PrivateRoute
                    allowedRoles={route.role}
                    element={route.element}
                />
            } />
            ))}
            <Route path={"*"} element={<Error404 />} />
        </Routes>
    )
}
