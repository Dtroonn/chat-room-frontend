import { IUser } from "redux/ducks/auth/contracts/state";
export interface IMessage {
    _id: string;
    user: IUser;
    text: string;
}

export interface IMessagesResponse {
    items: IMessage[];
}
