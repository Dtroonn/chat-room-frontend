import { RootState } from "redux/store";

export const roomsState = (state: RootState) => state.rooms;

export const items = (state: RootState) => roomsState(state).items;

export const isLoadingFetchRoomsStatus = (state: RootState) =>
    roomsState(state).fetchRoomsLoadingStatus === "LOADING";

export const isLoadedFetchRoomsStatus = (state: RootState) =>
    roomsState(state).fetchRoomsLoadingStatus === "LOADED";

export const isErrorFetchRoomsStatus = (state: RootState) =>
    roomsState(state).fetchRoomsLoadingStatus === "ERROR";
