import { ILoginFormValues } from "components/LoginForm";
import { IRegisterFormValues } from "components/RegisterForm";
import { LoadingStatus } from "redux/contracts/loadingStatus";
import {
    AuthActionsType,
    IFetchCheckAuthAction,
    IFetchLoginAction,
    IFetchMailConfirmAction,
    IFetchVerifyMailAction,
    ISetCheckAuthLoadingStatusAction,
    ISetLoginLoadingStatusAction,
    ISetUserAction,
    ISetMailConfirmLoadingStatusAction,
    IFetchRegisterAction,
    ISetRegisterLoadingStatusAction,
} from "./contracts/actions";
import { IUser, LoginLoadingStatus } from "./contracts/state";

export const setUser = (payload: IUser): ISetUserAction => ({
    type: AuthActionsType.SET_USER,
    payload,
});

export const fetchLogin = (payload: ILoginFormValues): IFetchLoginAction => ({
    type: AuthActionsType.FETCH_LOGIN,
    payload,
});

export const setCheckAuthLoadingStatus = (
    payload: LoadingStatus,
): ISetCheckAuthLoadingStatusAction => ({
    type: AuthActionsType.SET_CHECK_AUTH_LOADING_STATUS,
    payload,
});

export const setLoginLoadingStatus = (
    payload: LoginLoadingStatus,
): ISetLoginLoadingStatusAction => ({
    type: AuthActionsType.SET_LOGIN_LOADING_STATUS,
    payload,
});

export const fetchCheckAuth = (): IFetchCheckAuthAction => ({
    type: AuthActionsType.FETCH_CHECK_AUTH,
});

export const fetchMailConfirm = (payload: string): IFetchMailConfirmAction => ({
    type: AuthActionsType.FETCH_MAIL_CONFIRM,
    payload,
});

export const setMailConfirmLoadingStatus = (
    payload: LoadingStatus,
): ISetMailConfirmLoadingStatusAction => ({
    type: AuthActionsType.SET_MAIL_CONFIRM_LOADING_STATUS,
    payload,
});

export const fetchVerifyMail = (): IFetchVerifyMailAction => ({
    type: AuthActionsType.FETCH_VERIFY_MAIL,
});

export const fetchRegister = (payload: IRegisterFormValues): IFetchRegisterAction => ({
    type: AuthActionsType.FETCH_REGISTER,
    payload,
});

export const setRegisterLoadingStatus = (
    payload: LoadingStatus,
): ISetRegisterLoadingStatusAction => ({
    type: AuthActionsType.SET_REGISTER_LOADING_STATUS,
    payload,
});
