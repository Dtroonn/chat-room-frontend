import { RootState } from "redux/store";

export const notificationState = (state: RootState) => state.notification;

export const data = (state: RootState) => notificationState(state).data;
