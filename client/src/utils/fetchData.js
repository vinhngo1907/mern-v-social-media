import axios from "axios";

export const getDataApi = (url, token) => {
    return axios.get(`api/${url}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const postDataApi = (url, post, token) => {
    return axios.post(`api/${url}`, post, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const patchDataApi = (url, post, token) => {
    return axios.patch(`api/${url}`, post, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const putDataApi = (url, post, token) => {
    return axios.put(`api/${url}`, post, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const deleteDataApi = (url, token) => {
    return axios.delete(`api/${url}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}