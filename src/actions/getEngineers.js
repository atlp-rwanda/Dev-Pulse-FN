import axios from 'axios';
import { FETCH_RATING, GET_ENGINEERS } from './actionType';

export const getEngineers = () => (dispatch) => {
  const token = localStorage.getItem('pulseToken');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  axios
    .get(`${process.env.API_URL}/api/v1/ratings`, config)
    .then((response) => {
      // console.log('rating inge', response.data);
      dispatch({
        type: GET_ENGINEERS,
        payload: response,
      });
    })
    .catch((error) =>
      console.log('the response is : ', error)
    );

    axios
    .get(`${process.env.API_URL}/api/v1/ratings/rate`, config)
    .then((response) => {
      dispatch({
        type: FETCH_RATING,
        payload: response.data,
      });
    });
};
