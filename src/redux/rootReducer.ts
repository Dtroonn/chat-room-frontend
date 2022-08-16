import { combineReducers } from "redux";

import { authReducer } from "./ducks/auth/reducer";
import { roomsReducer } from "./ducks/rooms/reducer";
import { notificationReducer } from "./ducks/notification/reducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    rooms: roomsReducer,
    notification: notificationReducer,
});
