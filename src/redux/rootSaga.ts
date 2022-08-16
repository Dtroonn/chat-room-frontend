import { all } from "@redux-saga/core/effects";
import { watchAuthAsync } from "./ducks/auth/sagas";
import { watchRoomsAsync } from "./ducks/rooms/sagas";

export function* rootSaga() {
    yield all([watchAuthAsync(), watchRoomsAsync()]);
}
