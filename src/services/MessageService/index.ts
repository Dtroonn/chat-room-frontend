import { $axios } from "core/axios";
import { IMessagesResponse, IMessage } from "./types";

export class MessageService {
    static async create(roomId: string, message: string): Promise<IMessage> {
        const response = await $axios.post<IMessage>(`messages/${roomId}`, { text: message });

        return response.data;
    }

    static async getMessages(roomId: string): Promise<IMessagesResponse> {
        const response = await $axios.get<IMessagesResponse>(`messages/${roomId}`);

        return response.data;
    }
}
