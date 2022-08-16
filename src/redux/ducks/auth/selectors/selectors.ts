import { RootState } from "redux/store";

export const authState = (state: RootState) => state.auth;

export const isAuth = (state: RootState) => authState(state).isAuth;

export const user = (state: RootState) => authState(state).user;

export const isLoadingCheckAuthStatus = (state: RootState) =>
    authState(state).checkAuthloadingStatus === "LOADING";

export const isSuccessCheckAuthStatus = (state: RootState) =>
    authState(state).checkAuthloadingStatus === "SUCCESS";

export const isErrorCheckAuthStatus = (state: RootState) =>
    authState(state).checkAuthloadingStatus === "ERROR";

export const isReady = (state: RootState) =>
    authState(state).checkAuthloadingStatus !== "NEVER" &&
    authState(state).checkAuthloadingStatus !== "LOADING";

export const isLoadingLoginStatus = (state: RootState) =>
    authState(state).loginLoadingStatus === "LOADING";

export const isSuccessLoginStatus = (state: RootState) =>
    authState(state).loginLoadingStatus === "SUCCESS";

export const isErrorLoginStatus = (state: RootState) =>
    authState(state).loginLoadingStatus === "ERROR";

export const isAfterLoginStatus = (state: RootState) =>
    authState(state).loginLoadingStatus === "AFTER_LOGIN";

export const isSuccessMailConfirmStatus = (state: RootState) =>
    authState(state).mailConfirmLoadingStatus === "SUCCESS";

export const isErrorMailConfirmStatus = (state: RootState) =>
    authState(state).mailConfirmLoadingStatus === "ERROR";

export const isLoadingRegisterStatus = (state: RootState) =>
    authState(state).registerLoadingStatus === "LOADING";

export const isSuccessRegisterStatus = (state: RootState) =>
    authState(state).registerLoadingStatus === "SUCCESS";

export const isErrorRegisterStatus = (state: RootState) =>
    authState(state).registerLoadingStatus === "ERROR";
