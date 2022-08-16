import axios from "axios";
import { IAuthResponse } from "services/AuthService/types";

const $axios = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:7000/api/",
});

$axios.interceptors.request.use((config) => {
    if (config.headers) {
        config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    }
    return config;
});

$axios.interceptors.response.use(
    (config) => {
        return config;
    },
    async (err) => {
        let originalRequest = err.config;
        if (err.response.status === 401 && originalRequest && !originalRequest._isRetry) {
            originalRequest._isRetry = true;
            const response = await axios.get<IAuthResponse>(
                "http://localhost:7000/api/auth/refresh",
                {
                    withCredentials: true,
                },
            );
            localStorage.setItem("token", response.data.accessToken);
            return $axios.request(originalRequest);
        }

        throw err;
    },
);

export { $axios };
