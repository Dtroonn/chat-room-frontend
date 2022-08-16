import { NotificationActions, NotificationActionsType } from "./contracts/actions";
import produce, { Draft } from "immer";

import { INotificationState } from "./contracts/state";

const initialState: INotificationState = {
    data: {
        message: "",
        options: undefined,
    },
};

export const notificationReducer = produce(
    (draft: Draft<INotificationState>, action: NotificationActions) => {
        switch (action.type) {
            case NotificationActionsType.SET_NOTIFICATION:
                //@ts-ignore
                draft.data = action.payload;
                break;
            default:
                break;
        }
    },
    initialState,
);
