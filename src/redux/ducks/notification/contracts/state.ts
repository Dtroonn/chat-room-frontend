import { OptionsObject } from "notistack";

export interface INotificationState {
    data: {
        message: string;
        options?: OptionsObject | undefined;
    };
}
