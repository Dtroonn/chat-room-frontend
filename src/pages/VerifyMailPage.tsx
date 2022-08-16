import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { Link, useHistory, useParams } from "react-router-dom";
import { fetchMailConfirm } from "redux/ducks/auth/actions";
import { authSelectors } from "redux/ducks/auth/selectors";
import DoneIcon from "@mui/icons-material/Done";

export const VerifyMailPage: React.FC = () => {
    const [secs, setSecs] = React.useState<number>(5);

    const isSuccessMailConfirmStatus = useSelector(authSelectors.isSuccessMailConfirmStatus);
    const isErrorMailConfirmStatus = useSelector(authSelectors.isErrorMailConfirmStatus);

    const isReady = isSuccessMailConfirmStatus || isErrorMailConfirmStatus;

    const dispatch = useDispatch();

    const history = useHistory();
    const { token } = useParams<{ token: string }>();

    React.useEffect(() => {
        let timerId: ReturnType<typeof setTimeout>;

        if (isSuccessMailConfirmStatus && secs !== 0) {
            timerId = setTimeout(() => setSecs((prev) => --prev), 1000);
        }

        if (isSuccessMailConfirmStatus && secs === 0) {
            history.replace("/");
        }

        return () => clearTimeout(timerId);
    }, [isSuccessMailConfirmStatus, secs]);

    React.useEffect(() => {
        dispatch(fetchMailConfirm(token));
    }, []);

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "calc(100vh - 130px)",
            }}>
            <Container maxWidth={isSuccessMailConfirmStatus ? "md" : "sm"}>
                <Paper
                    elevation={3}
                    sx={{
                        p: 4,
                    }}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                        {!isReady && (
                            <>
                                <Typography sx={{ mr: 1 }} variant="h5">
                                    Идет подтверждение
                                </Typography>
                                <CircularProgress sx={{ mt: -0.5 }} size={30} />
                            </>
                        )}

                        {isSuccessMailConfirmStatus && (
                            <>
                                <Typography sx={{ mr: 0.5 }} variant="h5" component="p">
                                    Ваш аккаунт успешно подтвержден
                                </Typography>
                                <DoneIcon sx={{ mt: -0.5 }} color="success" fontSize="large" />
                            </>
                        )}
                    </div>
                    {isSuccessMailConfirmStatus && (
                        <div style={{ marginTop: "4px" }}>
                            <Typography textAlign="center" variant="h5" component="p">
                                Вы будете перенаправлены на главную страницу через{" "}
                                <Typography variant="h5" color="primary" component="span">
                                    {secs}
                                </Typography>
                            </Typography>
                            <Link
                                style={{ marginTop: 12, display: "block", textDecoration: "none" }}
                                to="/"
                                replace>
                                <Button variant="contained" fullWidth>
                                    Перейти на главную
                                </Button>
                            </Link>
                        </div>
                    )}
                </Paper>
            </Container>
        </div>
    );
};
