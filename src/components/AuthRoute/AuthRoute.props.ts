import React from 'react';
import { RouteProps } from "react-router-dom";

export interface AuthRouteProps extends RouteProps {
    isAuth: boolean;
    children?: React.ReactNode
}
