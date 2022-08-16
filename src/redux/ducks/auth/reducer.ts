import produce, { Draft } from "immer";
import { AuthActions, AuthActionsType } from "./contracts/actions";

import { IAuthState } from "./contracts/state";

const initialState: IAuthState = {
    isAuth: false,
    user: null,
    checkAuthloadingStatus: "NEVER",
    loginLoadingStatus: "NEVER",
    mailConfirmLoadingStatus: "NEVER",
    registerLoadingStatus: "NEVER",
};

export const authReducer = produce((draft: Draft<IAuthState>, action: AuthActions) => {
    switch (action.type) {
        case AuthActionsType.SET_USER:
            draft.user = action.payload;
            draft.isAuth = true;
            break;
        case AuthActionsType.FETCH_LOGIN:
            draft.loginLoadingStatus = "LOADING";
            break;
        case AuthActionsType.SET_LOGIN_LOADING_STATUS:
            draft.loginLoadingStatus = action.payload;
            break;
        case AuthActionsType.FETCH_CHECK_AUTH:
            draft.checkAuthloadingStatus = "LOADING";
            break;
        case AuthActionsType.SET_CHECK_AUTH_LOADING_STATUS:
            draft.checkAuthloadingStatus = action.payload;
            break;
        case AuthActionsType.FETCH_MAIL_CONFIRM:
            draft.mailConfirmLoadingStatus = "LOADING";
            break;
        case AuthActionsType.SET_MAIL_CONFIRM_LOADING_STATUS:
            draft.mailConfirmLoadingStatus = action.payload;
            break;
        case AuthActionsType.FETCH_REGISTER:
            draft.registerLoadingStatus = "LOADING";
            break;
        case AuthActionsType.SET_REGISTER_LOADING_STATUS:
            draft.registerLoadingStatus = action.payload;
            break;
        default:
            break;
    }
}, initialState);
