import { put, takeEvery, call } from "redux-saga/effects";
import { IRoomsResponse } from "services/RoomService/types";
import { RoomsActionsType } from "./contracts/actions";
import { RoomService } from "services/RoomService";
import { setRooms } from "./actions";

export function* fetchRoomsAsync() {
    const data: IRoomsResponse = yield call(RoomService.getRooms);

    yield put(setRooms(data.items));
}

export function* watchRoomsAsync() {
    yield takeEvery(RoomsActionsType.FETCH_ROOMS, fetchRoomsAsync);
}
