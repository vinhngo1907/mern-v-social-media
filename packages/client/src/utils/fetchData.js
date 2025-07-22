import axios from "axios";
import { apiUrl } from "./constants";

export const getDataApi = (url, token) => {
    return axios.get(`${apiUrl}/api/${url}`, {
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const postDataApi = (url, post, token) => {
    return axios.post(`${apiUrl}/api/${url}`, post, {
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const patchDataApi = (url, post, token) => {
    return axios.patch(`${apiUrl}/api/${url}`, post, {
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const putDataApi = (url, post, token) => {
    return axios.put(`${apiUrl}/api/${url}`, post, {
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const deleteDataApi = (url, token) => {
    return axios.delete(`${apiUrl}/api/${url}`, {
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}