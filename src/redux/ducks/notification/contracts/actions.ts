import { INotificationState } from "./state";

export enum NotificationActionsType {
    SET_NOTIFICATION = "notification/SET_NOTIFICATION",
}

export interface ISetNotificationAction {
    type: NotificationActionsType.SET_NOTIFICATION;
    payload: INotificationState["data"];
}

export type NotificationActions = ISetNotificationAction;
