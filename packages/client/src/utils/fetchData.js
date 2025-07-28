import axios from "axios";
import { apiUrl } from "./constants";

// export const getDataApi = (url, token) => {
//     return axios.get(`${apiUrl}/api/${url}`, {
//         withCredentials: true,
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     });
// }

// export const postDataApi = (url, post, token) => {
//     return axios.post(`${apiUrl}/api/${url}`, post, {
//         withCredentials: true,
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     });
// }

// export const patchDataApi = (url, post, token) => {
//     return axios.patch(`${apiUrl}/api/${url}`, post, {
//         withCredentials: true,
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     });
// }

// export const putDataApi = (url, post, token) => {
//     return axios.put(`${apiUrl}/api/${url}`, post, {
//         withCredentials: true,
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     });
// }

// export const deleteDataApi = (url, token) => {
//     return axios.delete(`${apiUrl}/api/${url}`, {
//         withCredentials: true,
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     });
// }


const axiosInstance = (token) =>
    axios.create({
        baseURL: `${apiUrl}/api/`,
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

export const getDataApi = (url, token) => axiosInstance(token).get(url);
export const postDataApi = (url, data, token) => axiosInstance(token).post(url, data);
export const patchDataApi = (url, data, token) => axiosInstance(token).patch(url, data);
export const putDataApi = (url, data, token) => axiosInstance(token).put(url, data);
export const deleteDataApi = (url, token) => axiosInstance(token).delete(url);