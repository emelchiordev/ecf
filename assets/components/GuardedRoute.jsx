import React from "react";
import { Navigate } from "react-router-dom";

const GuardedRoute = ({ children, isAuthenticatedStatus, ...props }) => {
  console.log("AUTHENTICATED " + isAuthenticatedStatus);
  return isAuthenticatedStatus.status ? children : <Navigate to="/connexion" />;
};

export default GuardedRoute;
