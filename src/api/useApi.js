import axios from "axios";
import config from './config'

export const useApi = () => {

    const axiosInstance = axios.create({
        baseURL: config.dev,
        headers: {
            "Content-Type": "application/json",
        },
    });

    return {
        fetch: async (endpoint, params = {}) => {
            const response = await axiosInstance.get(endpoint, { params });
            return response.data;
        },
        post: async (endpoint, data = {}) => {
            const response = await axiosInstance.post(endpoint, data);
            return response.data;
        },
        patch: async (endpoint, data = {}) => {
            const response = await axiosInstance.patch(endpoint, data);
            return response.data;
        },
    };
};
