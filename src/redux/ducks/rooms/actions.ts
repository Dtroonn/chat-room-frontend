import { IFetchRoomsAction, ISetRoomsAction, RoomsActionsType } from "./contracts/actions";
import { IRoom } from "./contracts/state";

export const fetchRooms = (): IFetchRoomsAction => ({
    type: RoomsActionsType.FETCH_ROOMS,
});

export const setRooms = (payload: IRoom[]): ISetRoomsAction => ({
    type: RoomsActionsType.SET_ROOMS,
    payload,
});
