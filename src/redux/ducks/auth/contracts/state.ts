import { LoadingStatus } from "redux/contracts/loadingStatus";

export interface IUser {
    _id: string;
    email: string;
    username: string;
}

export type LoginLoadingStatus = LoadingStatus | "AFTER_LOGIN";

export interface IAuthState {
    isAuth: boolean;
    user: null | IUser;
    checkAuthloadingStatus: LoadingStatus;
    loginLoadingStatus: LoginLoadingStatus;
    mailConfirmLoadingStatus: LoadingStatus;
    registerLoadingStatus: LoadingStatus;
}
