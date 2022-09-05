import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ children, ...props }) => {
  console.log(props.authorized)
  return (
    <Route>
      {() => (props.authorized ? children : <Redirect to="/" />)}
    </Route>
  );
};

export default ProtectedRoute;
