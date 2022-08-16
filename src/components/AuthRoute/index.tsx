import React from "react";
import { Redirect, Route } from "react-router-dom";

import { AuthRouteProps } from "./AuthRoute.props";

export const AuthRoute: React.FC<AuthRouteProps> = ({ isAuth, children, ...rest }) => {
    return (
        <Route
            {...rest}
            //@ts-ignore
            render={({ location }) =>
                isAuth ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
};
