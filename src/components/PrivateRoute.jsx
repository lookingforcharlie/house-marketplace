import React from "react";
// Navigate is for redirect, Outlet allows us to render child routes or child elements
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../assets/hooks/useAuthStatus";
import Spinner from "./Spinner";

const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return <Spinner />;
  }

  return loggedIn ? <Outlet /> : <Navigate to='/sign-in' />;
};

export default PrivateRoute;
