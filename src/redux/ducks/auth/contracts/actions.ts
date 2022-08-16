import { ILoginFormValues } from "components/LoginForm";
import { IRegisterFormValues } from "components/RegisterForm";
import { LoadingStatus } from "redux/contracts/loadingStatus";
import { IUser, LoginLoadingStatus } from "./state";

export enum AuthActionsType {
    SET_USER = "auth/SET_USER",
    FETCH_LOGIN = "auth/FETCH_LOGIN",
    SET_CHECK_AUTH_LOADING_STATUS = "auth/SET_CHECK_AUTH_LOADING_STATUS",
    SET_LOGIN_LOADING_STATUS = "auth/SET_LOGIN_LOADING_STATUS",
    FETCH_CHECK_AUTH = "auth/FETCH_CHECK_AUTH",
    FETCH_VERIFY_MAIL = "auth/FETCH_VERIFY_MAIL",
    SET_MAIL_CONFIRM_LOADING_STATUS = "auth/SET_MAIL_CONFIRM_LOADING_STATUS",
    FETCH_MAIL_CONFIRM = "auth/FETCH_MAIL_CONFIRM",
    FETCH_REGISTER = "auth/FETCH_REGISTER",
    SET_REGISTER_LOADING_STATUS = "auth/SET_REGISTER_LOADING_STATUS",
}

export interface ISetUserAction {
    type: AuthActionsType.SET_USER;
    payload: IUser;
}

export interface IFetchLoginAction {
    type: AuthActionsType.FETCH_LOGIN;
    payload: ILoginFormValues;
}

export interface ISetCheckAuthLoadingStatusAction {
    type: AuthActionsType.SET_CHECK_AUTH_LOADING_STATUS;
    payload: LoadingStatus;
}

export interface ISetLoginLoadingStatusAction {
    type: AuthActionsType.SET_LOGIN_LOADING_STATUS;
    payload: LoginLoadingStatus;
}

export interface IFetchCheckAuthAction {
    type: AuthActionsType.FETCH_CHECK_AUTH;
}

export interface IFetchMailConfirmAction {
    type: AuthActionsType.FETCH_MAIL_CONFIRM;
    payload: string;
}

export interface ISetMailConfirmLoadingStatusAction {
    type: AuthActionsType.SET_MAIL_CONFIRM_LOADING_STATUS;
    payload: LoadingStatus;
}

export interface IFetchVerifyMailAction {
    type: AuthActionsType.FETCH_VERIFY_MAIL;
}

export interface IFetchRegisterAction {
    type: AuthActionsType.FETCH_REGISTER;
    payload: IRegisterFormValues;
}

export interface ISetRegisterLoadingStatusAction {
    type: AuthActionsType.SET_REGISTER_LOADING_STATUS;
    payload: LoadingStatus;
}

export type AuthActions =
    | ISetUserAction
    | IFetchLoginAction
    | ISetCheckAuthLoadingStatusAction
    | ISetLoginLoadingStatusAction
    | IFetchCheckAuthAction
    | IFetchMailConfirmAction
    | ISetMailConfirmLoadingStatusAction
    | IFetchVerifyMailAction
    | IFetchRegisterAction
    | ISetRegisterLoadingStatusAction;
