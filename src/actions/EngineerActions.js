
import axios from 'axios';
import { FETCH_ENGINEER, FETCH_RATING } from './actionType';

const baseUrl = process.env.API_URL;

export const fetchEngineer = (id) => (dispatch) => {
  const token = localStorage.getItem('pulseToken');
  axios.get(`${baseUrl}/api/v1/users/${id}`, { // change the url
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': `${process.env.API_URL}`,
    },
  }).then((response) => {
    console.log("fetching enginener done", response)

    dispatch({
      type: FETCH_ENGINEER,
      payload: response.data.data,
    });
  }).catch((error) => console.log('the response is : ', error));
};

export const fetchRating = (id) => (dispatch) => {


  
  const token = localStorage.getItem('pulseToken');
  axios.get(`${baseUrl}/api/v1/ratings/${id}`, { // change the url
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': `${process.env.API_URL}`,
    },
  }).then((response) => {
    console.log("fetching rating done", response)

    dispatch({

      type: FETCH_RATING,
      payload: response.data.data,
    });
  }).catch((error) => console.log('the response is : ', error));
};