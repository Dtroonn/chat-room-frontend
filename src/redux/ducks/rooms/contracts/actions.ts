import { LoadingStatus } from "redux/contracts/loadingStatus";
import { IRoom } from "./state";

export enum RoomsActionsType {
    FETCH_ROOMS = "rooms/FETCH_ROOMS",
    SET_ROOMS = "rooms/SET_ROOMS",
    SET_FETCH_ROOMS_LOADING_STATUS = "rooms/SET_FETCH_ROOMS_LOADING_STATUS",
}

export interface IFetchRoomsAction {
    type: RoomsActionsType.FETCH_ROOMS;
}

export interface ISetRoomsAction {
    type: RoomsActionsType.SET_ROOMS;
    payload: IRoom[];
}

export interface ISetFetchRoomsLoadingStatusAction {
    type: RoomsActionsType.SET_FETCH_ROOMS_LOADING_STATUS;
    payload: LoadingStatus;
}

export type RoomsActions = IFetchRoomsAction | ISetRoomsAction | ISetFetchRoomsLoadingStatusAction;
