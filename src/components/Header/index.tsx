import React from "react";
import { Link } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Container from "@mui/material/Container";
import { ProfileMenu } from "./ProfileMenu";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";

import { authSelectors } from "redux/ducks/auth/selectors";

export const Header = () => {
    const isAuth = useSelector(authSelectors.isAuth);

    return (
        <AppBar>
            <Container maxWidth="xl">
                <Toolbar>
                    <div style={{ marginLeft: "auto" }}>
                        {isAuth ? (
                            <ProfileMenu />
                        ) : (
                            <LoginLink to="/login">
                                <AccountCircleIcon sx={{ fontSize: 55, mr: 1 }} />
                                <Typography sx={{ fontWeight: 500 }}>Войти</Typography>
                            </LoginLink>
                        )}
                    </div>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

const LoginLink = styled(Link)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: "#000",
    "& p, svg ": {
        transition: "all 0.4s ease-in-out 0s",
        color: theme.palette.secondary.main,
    },
    "&:hover": {
        "& svg, p ": {
            color: theme.palette.secondary.light,
        },
    },
}));
