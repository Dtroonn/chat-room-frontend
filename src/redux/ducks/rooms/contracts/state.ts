import { IUser } from "redux/ducks/auth/contracts/state";
import { LoadingStatus } from "redux/contracts/loadingStatus";

export interface IRoom {
    description: string | null;
    admins: IUser[];
    image: any;
    usersCount: number;
    _id: string;
    title: string;
}

export interface IRoomsState {
    items: IRoom[];
    fetchRoomsLoadingStatus: LoadingStatus;
}
