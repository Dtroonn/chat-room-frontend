import React from "react";
import { Route } from "react-router-dom";

import Paper from "@mui/material/Paper";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

import { LoginForm } from "../components/LoginForm";
import { RegisterForm } from "../components/RegisterForm";
import Container from "@mui/material/Container";

export const LoginAndRegisterPage: React.FC = () => {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "calc(100vh - 130px)",
            }}>
            <Container maxWidth="sm">
                <Paper
                    elevation={3}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        px: 5,
                        pt: 2,
                        pb: 4,
                    }}>
                    <Avatar sx={{ backgroundColor: "primary.main", margin: 1 }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        <Route exact path="/login">
                            Авторизация
                        </Route>
                        <Route exact path="/register">
                            Регистрация
                        </Route>
                    </Typography>
                    <Route exact path="/login" component={LoginForm} />
                    <Route exact path="/register" component={RegisterForm} />
                </Paper>
            </Container>
        </div>
    );
};
