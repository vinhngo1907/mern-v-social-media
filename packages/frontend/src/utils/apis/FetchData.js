import axios from 'axios';
import {apiUrl} from '../../context/constants';

export const getDataAPI = async (url, token) => {
  return await axios.get(`${apiUrl}/api/${url}`, {
    headers: {Authorization: `Bearer ${token}`},
    withCredentials: true,
  });
};

export const postDataAPI = async (url, post, token) => {
  const res = await axios.post(`${apiUrl}/api/${url}`, post, {
    headers: {Authorization: `Bearer ${token}`},
    withCredentials: true,
  });
  return res;
};

export const putDataAPI = async (url, post, token) => {
  const res = await axios.put(`${apiUrl}/api/${url}`, post, {
    headers: {Authorization: `Bearer ${token}`},
  });
  return res;
};

export const patchDataAPI = async (url, post, token) => {
  const res = await axios.patch(`${apiUrl}/api/${url}`, post, {
    headers: {Authorization: `Bearer ${token}`},
  });
  return res;
};

export const deleteDataAPI = async (url, token) => {
  const res = await axios.delete(`${apiUrl}/api/${url}`, {
    headers: {Authorization: `Bearer ${token}`},
  });
  return res;
};
