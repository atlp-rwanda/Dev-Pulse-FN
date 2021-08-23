import axios from 'axios';
import {
  FETCH_ENGINEER,
  FETCH_RATING,
  SELECTED_COHORT,
  SELECTED_PROGRAM,
  CHANGE_PROGRAM,
  UPDATE_ENGINEER_COHORT,
  GET_COHORTS,
} from './actionType';

const baseUrl = process.env.API_URL;

export const fetchCohorts = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('pulseToken');
    const res = await axios.get(
      `${baseUrl}/api/v1/cohorts`,
      {
        method: 'GET',
        mode: 'cors',
        cashe: 'no-cashe',
        credentials: 'same-origin',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',

          'Access-Control-Allow-Origin': `${process.env.API_URL}`,
        },
      }
    );
    const { data: cohort } = res.data;
    return dispatch({
      type: 'GET_COHORTS',
      payload: cohort,
    });
  } catch (err) {}
};
export const fetchPrograms =
  (cohortId) => async (dispatch) => {
    const token = localStorage.getItem('pulseToken');
    return axios
      .get(`${baseUrl}/api/v1/programs`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': `${process.env.API_URL}`,
        },
      })
      .then((response) => {
        const programs = response.data.data;
        if (cohortId) {
          const filterPrograms = programs.filter(
            (program) => program.cohortId === cohortId
          );
          return dispatch({
            type: CHANGE_PROGRAM,
            payload: filterPrograms,
          });
        }
        return dispatch({
          type: CHANGE_PROGRAM,
          payload: [],
        });
      })
      .catch((err) => {
        console.log('failed to get programs', err);
        return null;
      })

      .catch((error) => {
        console.log('the response is : ', error);
      });
  };
export const updateEngineerCohort =
  (payload) => async (dispatch) => {
    console.log(payload);
    const token = localStorage.getItem('pulseToken');
    dispatch({ type: UPDATE_ENGINEER_COHORT, payload });
    const res1 = await axios.get(
      `${baseUrl}/api/v1/programs`,
      {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': `${process.env.API_URL}`,
        },
      }
    );
    if (payload.cohort) {
      const { data: programs } = res1.data;
      const filterPrograms = programs.filter(
        (program) => program.cohortId === payload.cohort
      );
      return dispatch({
        type: CHANGE_PROGRAM,
        payload: filterPrograms,
      });
    }
  };
export const fetchEngineer = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('pulseToken');
    const res = await axios.get(
      `${baseUrl}/api/v1/users/${id}`,
      {
        // change the url
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': `${process.env.API_URL}`,
        },
      }
    );
    const { data: user } = res.data;
    dispatch({
      type: FETCH_ENGINEER,
      payload: user,
    });
    if (user) {
      const res2 = await axios.get(
        `${baseUrl}/api/v1/cohorts`,
        {
          method: 'GET',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': `${process.env.API_URL}`,
          },
        }
      );
      const { data: cohort } = res2.data;
      console.log('cohorts', cohort);
      dispatch({
        type: GET_COHORTS,
        payload: cohort,
      });
    }

    const res1 = await axios.get(
      `${baseUrl}/api/v1/programs`,
      {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': `${process.env.API_URL}`,
        },
      }
    );
    if (user.cohort) {
      const { data: programs } = res1.data;
      const filterPrograms = programs.filter(
        (program) => program.cohortId === user.cohort
      );
      return dispatch({
        type: CHANGE_PROGRAM,
        payload: filterPrograms,
      });
    }
    dispatch({
      type: CHANGE_PROGRAM,
      payload: [],
    });
  } catch (error) {
    console.log('the response is : ', error);
  }
};
export const selectCohort = (cohort) => (dispatch) => {
  dispatch({
    type: SELECTED_COHORT,
    payload: cohort,
  });
};
export const selectProgram = (program) => (dispatch) => {
  dispatch({
    type: SELECTED_PROGRAM,
    payload: program,
  });
};
// export const updateCohort=(cohortId)=>(dispatch)=>{

// }
export const fetchRating = (id) => (dispatch) => {
  const token = localStorage.getItem('pulseToken');
  axios
    .get(`${baseUrl}/api/v1/ratings/${id}`, {
      // change the url
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': `${process.env.API_URL}`,
      },
    })
    .then((response) => {
      console.log('fetching rating done', response);

      dispatch({
        type: FETCH_RATING,
        payload: response.data.data,
      });
    })
    .catch((error) =>
      console.log('the response is : ', error)
    );
};
