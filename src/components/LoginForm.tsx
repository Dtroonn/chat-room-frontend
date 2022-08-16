import React from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import TextField from "@mui/material/TextField";

import LinkMUI from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogin, setLoginLoadingStatus } from "redux/ducks/auth/actions";
import LoadingButton from "@mui/lab/LoadingButton";

import { authSelectors } from "redux/ducks/auth/selectors";

export interface ILoginFormValues {
    username: string;
    password: string;
}

const validationSchema = yup.object().shape({
    username: yup.string().required("Поле обязательно к заполнению"),
    password: yup.string().required("Поле обязательно к заполнению"),
});

export const LoginForm: React.FC = () => {
    const dispatch = useDispatch();

    const location = useLocation();
    const history = useHistory();

    const isLoading = useSelector(authSelectors.isLoadingLoginStatus);
    const isSuccess = useSelector(authSelectors.isSuccessLoginStatus);

    React.useEffect(() => {
        if (isSuccess) {
            //@ts-ignore
            const link = location.state?.from?.pathname || "/";
            history.replace(link);
            dispatch(setLoginLoadingStatus("AFTER_LOGIN"));
        }
    }, [isSuccess]);

    console.log("RENDER");

    const { handleSubmit, control, formState } = useForm<ILoginFormValues>({
        resolver: yupResolver(validationSchema),
        mode: "onChange",
    });

    const onSubmit: SubmitHandler<ILoginFormValues> = (data): void => {
        dispatch(fetchLogin(data));
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="username"
                control={control}
                defaultValue=""
                render={({ field, fieldState }) => (
                    <TextField
                        id="username"
                        name="username"
                        margin="normal"
                        fullWidth
                        variant="standard"
                        label="Имя пользователя или почта *"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        value={field.value}
                        onChange={field.onChange}
                    />
                )}
            />

            <Controller
                control={control}
                name="password"
                defaultValue=""
                render={({ field, fieldState }) => (
                    <TextField
                        id="password"
                        name="password"
                        margin="normal"
                        fullWidth
                        type="password"
                        variant="standard"
                        label="Пароль *"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        value={field.value}
                        onChange={field.onChange}
                    />
                )}
            />

            <Grid container justifyContent="flex-end">
                <Grid item>
                    <LinkMUI component={Link} to="/register" variant="body2">
                        Еще нет аккаунта? Зарегистрируйтесь!
                    </LinkMUI>
                </Grid>
            </Grid>
            <LoadingButton
                loading={isLoading}
                disabled={!formState.isValid}
                sx={{ mt: 2 }}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large">
                Войти
            </LoadingButton>
        </form>
    );
};
