import axios from "axios";

export const getDataApi = (url, token) => {
    return axios.get(`/api/${url}`, {
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const postDataApi = (url, post, token) => {
    return axios.post(`/api/${url}`, post, {
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const patchDataApi = (url, post, token) => {
    return axios.patch(`api/${url}`, post, {
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const putDataApi = (url, post, token) => {
    return axios.put(`api/${url}`, post, {
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const deleteDataApi = (url, token) => {
    return axios.delete(`api/${url}`, {
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}