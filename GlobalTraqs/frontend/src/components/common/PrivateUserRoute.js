import React from "react";
import { Route, Redirect } from "react-router-dom";
const PrivateUserRoute = ({ component: Component, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (auth.isLoading) {
          return <h2>Loading...</h2>;
        } else if (!auth.isAuthenticated) {
          return <Redirect to="/" />;
        } else {
          if (auth.user.is_administrator) return <Component {...props} />;
          else {
            return <Redirect to="/" />;
          }
        }
      }}
    />
  );
};

export default PrivateUserRoute;
