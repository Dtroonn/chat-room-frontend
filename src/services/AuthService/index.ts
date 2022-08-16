import axios from "axios";

import { ILoginFormValues } from "components/LoginForm";
import { IRegisterFormValues } from "components/RegisterForm";
import { $axios } from "core/axios";
import { IAuthResponse } from "./types";

export class AuthService {
    static async login(data: ILoginFormValues): Promise<IAuthResponse> {
        const response = await $axios.post<IAuthResponse>("auth/login", data);

        return response.data;
    }

    static async refresh(): Promise<IAuthResponse> {
        const response = await axios.get<IAuthResponse>("http://localhost:7000/api/auth/refresh", {
            withCredentials: true,
        });

        return response.data;
    }

    static async register(data: IRegisterFormValues): Promise<void> {
        const response = await $axios.post<void>("auth/register", data);

        return response.data;
    }

    static async confirmMail(token: string): Promise<IAuthResponse> {
        const response = await $axios.get<IAuthResponse>(`auth/verify-mail/${token}`);

        return response.data;
    }
}
