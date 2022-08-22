import React from "react";
import "./App.css";

import { Route, Redirect, Switch } from "react-router-dom";

import { LoginAndRegisterPage } from "./pages/LoginAndRegisterPage";
import { HomePage } from "./pages/HomePage";
import { Header } from "./components/Header/index";
import { RoomPage } from "./pages/RoomPage";
import { useDispatch, useSelector } from "react-redux";
import { authSelectors } from "redux/ducks/auth/selectors";
import { fetchCheckAuth, setCheckAuthLoadingStatus } from "redux/ducks/auth/actions";
import { Backdrop, CircularProgress } from "@mui/material";
import { AuthRoute } from "components/AuthRoute";
import { VerifyMailPage } from "pages/VerifyMailPage";
import { NotificationsModule } from "modules/NotificationsModule";
import "simplebar/dist/simplebar.min.css";

import "overlayscrollbars/css/OverlayScrollbars.css";

function App() {
    const isReady = useSelector(authSelectors.isReady);
    const isAuth = useSelector(authSelectors.isAuth);
    const isAfterLoginStatus = useSelector(authSelectors.isAfterLoginStatus);
    const isSuccessCheckAuthStatus = useSelector(authSelectors.isSuccessCheckAuthStatus);

    const dispatch = useDispatch();

    React.useEffect(() => {
        if (!isReady && !localStorage.getItem("token")) {
            dispatch(setCheckAuthLoadingStatus("LOADED"));
            return;
        }

        if (!isReady && !isAuth) {
            dispatch(fetchCheckAuth());
            return;
        }
    }, [isAuth, isReady, dispatch]);

    if (!isReady) {
        return (
            <Backdrop sx={{ backgroundColor: "white" }} open={true}>
                <CircularProgress size={70} color="primary" />
            </Backdrop>
        );
    }

    return (
        <div className="App">
            <Header />
            <main style={{ paddingTop: 70 }}>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <AuthRoute isAuth={isAuth} exact path="/rooms/:id">
                        <RoomPage />
                    </AuthRoute>
                    <Route exact path="/verify-mail/:token" component={VerifyMailPage} />
                    {!isSuccessCheckAuthStatus && !isAfterLoginStatus && (
                        <Route
                            exact
                            path={["/login", "/register"]}
                            component={LoginAndRegisterPage}
                        />
                    )}
                    <Redirect to="/" />
                </Switch>
            </main>
            <NotificationsModule />
        </div>
    );
}

export default App;
