import { RoomsActions, RoomsActionsType } from "./contracts/actions";
import produce, { Draft } from "immer";

import { IRoomsState } from "./contracts/state";

const initialState: IRoomsState = {
    items: [],
    fetchRoomsLoadingStatus: "NEVER",
};

export const roomsReducer = produce((draft: Draft<IRoomsState>, action: RoomsActions) => {
    switch (action.type) {
        case RoomsActionsType.FETCH_ROOMS:
            draft.fetchRoomsLoadingStatus = "LOADING";
            break;
        case RoomsActionsType.SET_ROOMS:
            draft.items = action.payload;
            draft.fetchRoomsLoadingStatus = "LOADED";
            break;
        case RoomsActionsType.SET_FETCH_ROOMS_LOADING_STATUS:
            draft.fetchRoomsLoadingStatus = action.payload;
            break;
        default:
            break;
    }
}, initialState);
