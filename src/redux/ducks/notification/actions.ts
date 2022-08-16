import { ISetNotificationAction, NotificationActionsType } from "./contracts/actions";
import { INotificationState } from "./contracts/state";

export const setNotification = (payload: INotificationState["data"]): ISetNotificationAction => ({
    type: NotificationActionsType.SET_NOTIFICATION,
    payload,
});
