import axios from 'axios';
import {
  FETCH_EMAILS_ERROR,
  FETCH_EMAILS_SUCCESS,
  ADD_EMAILS_ERROR,
  ADD_EMAILS_SUCCESS,
  REMOVE_EMAILS_SUCCESS,
  REMOVE_EMAILS_ERROR,
} from './actionType';

export const saveAuthorizedEmail = (emails) => (dispatch) => {
  const token = localStorage.getItem('pulseToken');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const body = { emails: [...emails] };
  axios.post(`${process.env.API_URL}/api/v1/emails`, body, config)
    .then((res) => {
      console.log('add response', res.data);
      dispatch({
        type: ADD_EMAILS_SUCCESS,
        payload: {
          message: res.data.message,
          emails: [...res.data.success],
        },
      });
    })
    .catch((error) => {
      console.log('Errorrrrrrr=>', body, error.response);
      dispatch({
        type: ADD_EMAILS_ERROR,
        payload: error.response.data.message,
      });
    });
};

export const removeAuthorizedEmail = (emails) => (dispatch) => {
  const token = localStorage.getItem('pulseToken');
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = { emails: [...emails] };
  const instance = axios.create();
  instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  instance.delete(`${process.env.API_URL}/api/v1/emails`, { data: body}, config)
    .then((res) => {
      console.log('remmove response', res.data, emails);
      dispatch({
        type: REMOVE_EMAILS_SUCCESS,
        payload: {
          message: res.data.message,
          emails: [...emails],
        },
      });
    })
    .catch((error) => {
      console.log('Errorrrrrrr=>', error.response);
      console.log('eeeeeeeeero', body, config);
      dispatch({
        type: REMOVE_EMAILS_ERROR,
        payload: error.response.data.message,
      });
    });
};

export const getEmailsList = () => (dispatch) => {
  const token = localStorage.getItem('pulseToken');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  axios.get(`${process.env.API_URL}/api/v1/emails`, config)
    .then((res) => {
      console.log('got emamils--------', res.data.success);
      dispatch({
        type: FETCH_EMAILS_SUCCESS,
        payload: res.data.success,
      });
    }).catch((error) => {
      console.log('faileeeed to fetch emails', error.response);
      dispatch({
        type: FETCH_EMAILS_ERROR,
        payload: error.response.status,
      });
    });
};

