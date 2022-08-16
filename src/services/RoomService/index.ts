import { $axios } from "core/axios";
import { IRoomsResponse } from "./types";

export class RoomService {
    static async getRooms(): Promise<IRoomsResponse> {
        const response = await $axios.get<IRoomsResponse>("rooms");

        return response.data;
    }

    static async joinToRoom(roomId: string): Promise<void> {
        return $axios.post(`rooms/join/${roomId}`)
    }
}
