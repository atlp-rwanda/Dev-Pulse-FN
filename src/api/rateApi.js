import { handleResponse, handleError } from './apiUtils';
import axios from 'axios';

const baseUrl = process.env.API_URL;

export const getMyEngineers = () => {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
};


export const rateEngineer = data =>{
    const token = localStorage.getItem('pulseToken');
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return axios.post(`${process.env.API_URL}/api/v1/ratings/rate`, data);
};
