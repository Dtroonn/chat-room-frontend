import {
    setLoginLoadingStatus,
    setUser,
    setCheckAuthLoadingStatus,
    setMailConfirmLoadingStatus,
    setRegisterLoadingStatus,
} from "./actions";
import { AuthService } from "services/AuthService";
import { takeEvery, call, put } from "redux-saga/effects";
import {
    AuthActionsType,
    IFetchLoginAction,
    IFetchMailConfirmAction,
    IFetchRegisterAction,
} from "./contracts/actions";
import { IAuthResponse } from "services/AuthService/types";

export function* loginAsync({ payload }: IFetchLoginAction): any {
    try {
        console.log("REQUEST");
        const data: IAuthResponse = yield call(AuthService.login, payload);

        localStorage.setItem("token", data.accessToken);
        yield put(setUser(data.user));
        yield put(setLoginLoadingStatus("SUCCESS"));
    } catch (e) {
        yield put(setLoginLoadingStatus("ERROR"));
    }
}

export function* checkAuthAsync() {
    try {
        console.log("POPAL V SAGA");
        const data: IAuthResponse = yield call(AuthService.refresh);

        localStorage.setItem("token", data.accessToken);
        yield put(setUser(data.user));
        yield put(setCheckAuthLoadingStatus("SUCCESS"));
    } catch (e) {
        yield put(setCheckAuthLoadingStatus("ERROR"));
    }
}

export function* mailConfirmAsync({ payload }: IFetchMailConfirmAction) {
    try {
        const data: IAuthResponse = yield call(AuthService.confirmMail, payload);

        localStorage.setItem("token", data.accessToken);
        yield put(setUser(data.user));
        yield put(setLoginLoadingStatus("AFTER_LOGIN"));

        yield put(setMailConfirmLoadingStatus("SUCCESS"));
    } catch (e) {}
}

export function* registerAsync({ payload }: IFetchRegisterAction) {
   try {
    yield call(AuthService.register, payload);
    yield put(setRegisterLoadingStatus("SUCCESS"));
   } catch(e) {
    console.log('HELLO')
    yield put(setRegisterLoadingStatus("ERROR"));
    throw e;
   }
}

export function* watchAuthAsync() {
    yield takeEvery(AuthActionsType.FETCH_LOGIN, loginAsync);
    yield takeEvery(AuthActionsType.FETCH_CHECK_AUTH, checkAuthAsync);
    yield takeEvery(AuthActionsType.FETCH_MAIL_CONFIRM, mailConfirmAsync);
    yield takeEvery(AuthActionsType.FETCH_REGISTER, registerAsync);
}
