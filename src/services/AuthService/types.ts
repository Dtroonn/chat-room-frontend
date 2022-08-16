import { IUser } from "redux/ducks/auth/contracts/state";

export interface IAuthResponse {
    accessToken: string;
    refreshToken: string;
    user: IUser;
}
