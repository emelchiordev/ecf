import React from "react";
import { Navigate } from "react-router-dom";

const GuardedRoute = ({ children, isAuthenticatedStatus, ...props }) => {
  return isAuthenticatedStatus.status ? children : <Navigate to="/connexion" />;
};

export default GuardedRoute;
