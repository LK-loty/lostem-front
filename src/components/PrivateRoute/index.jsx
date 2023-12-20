import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { isLogin } from "../../utils/auth";

const PrivateRoute = () => {
  return isLogin() ? <Outlet /> : <Navigate replace to="/login" />;
};

export default PrivateRoute;
