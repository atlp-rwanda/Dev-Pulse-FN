import axios from 'axios';
import { toast } from 'react-toastify';
import {
  FETCH_ENGINEER,
  FETCH_RATING,
  SELECTED_COHORT,
  SELECTED_PROGRAM,
  CHANGE_PROGRAM,
  UPDATE_ENGINEER_COHORT,
  GET_COHORTS,
  AVERAGE_RATING,
  ADD_COHORT,
  ADD_PROGRAM,
  ADD_SPRINT,
  REMOVE_COHORT,
  REMOVE_PROGRAM,
  UPDATE_PROGRAM,
  UPDATE_COHORT,
  FETCH_ALL_USERS_PENDING,
  FETCH_ALL_USERS_FAILED,
  FTECH_ALL_USER_SUCCESS,
  EXPORT_TRAINEE_RATINGS_PENDING,
  EXPORT_TRAINEE_RATINGS_SUCCESS,
  EXPORT_TRAINEE_RATINGS_FAILED,
  FETCH_SPRINTS_SUCCESS,
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
  export const fetchSprints = () => async (dispatch) => {
    try {
      const token = localStorage.getItem('pulseToken');
      
      const res = await axios.get(
        `${baseUrl}/api/v1/sprint`,
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
      console.log('the action sprint', res.data.data);
      return dispatch({
        type: FETCH_SPRINTS_SUCCESS,
        payload: res.data.data,
      });
    } catch (err) {}
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
    console.log('fetchin...', res.data);
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
      console.log('filteredprograms', filterPrograms);
      return dispatch({
        type: CHANGE_PROGRAM,
        payload: filterPrograms,
      });
    }
    console.log('programs');
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
export const averageRating = (payload) => (dispatch) => {
  dispatch({
    type: AVERAGE_RATING,
    payload,
  });
};

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
      console.log(
        'fetching rating done',
        response.data.data.average
      );
      const res = response.data.data;
      !res.average ? (res.average = []) : null;

      dispatch({
        type: FETCH_RATING,
        payload: res,
      });
    })
    .catch((error) =>
      console.log('the response is : ', error)
    );
};

export const updateProgram =
  (id, program) => async (dispatch) => {
    try {
      const token = localStorage.getItem('pulseToken');

      const response = await axios.patch(
        `${baseUrl}/api/v1/programs/${id}`,
        { ...program, id: undefined },
        {
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
      if (response.status === 200)
        dispatch({
          type: UPDATE_PROGRAM,
          payload: response.data.data,
        });
    } catch (error) {
      console.log(error);
      toast.error(`Unable to update program!`);
    }
  };

export const updateCohort =
  ({ id, name }) =>
  async (dispatch) => {
    try {
      const token = localStorage.getItem('pulseToken');

      const response = await axios.patch(
        `${baseUrl}/api/v1/cohorts/${id}`,
        { name },
        {
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
      if (response.status === 200)
        dispatch({
          type: UPDATE_COHORT,
          payload: response.data.data,
        });
    } catch (error) {
      console.log(error);
      toast.error('Unable to remove program!');
    }
  };

export const removeProgram = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('pulseToken');

    const response = await axios.delete(
      `${baseUrl}/api/v1/programs/${id}`,
      {
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
    if (response.status === 200)
      dispatch({
        type: REMOVE_PROGRAM,
        payload: response.data.data,
      });
    else toast.error(response.data.message);
  } catch (error) {
    console.log(error);
    toast.error(
      error.response.data.message ||
        'Unable to remove program!'
    );
  }
};

export const removeCohort = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('pulseToken');

    const response = await axios.delete(
      `${baseUrl}/api/v1/cohorts/${id}`,
      {
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
    if (response.status === 200)
      dispatch({
        type: REMOVE_COHORT,
        payload: response.data.data,
      });
    else toast.error(response.data.message);
  } catch (error) {
    console.log(error);
    toast.error(
      error.response.data.message ||
        'Unable to remove cohort!'
    );
  }
};

export const addCohort = (name) => async (dispatch) => {
  try {
    const token = localStorage.getItem('pulseToken');

    const response = await axios.post(
      `${baseUrl}/api/v1/cohorts`,
      { name },
      {
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
    if (response.status === 201)
      dispatch({
        type: ADD_COHORT,
        payload: response.data.data,
      });
  } catch (error) {
    console.log(error);
    toast.error('Unable to add cohort!');
  }
};

export const addProgram =
  (name, startDate, endDate, cohortId) =>
  async (dispatch) => {
    try {
      const token = localStorage.getItem('pulseToken');
      console.log('addProgram');
      const response = await axios.post(
        `${baseUrl}/api/v1/programs`,
        {
          name,
          start_date: startDate,
          end_date: endDate,
          cohortId,
        },
        {
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
      if (response.status === 201)
        dispatch({
          type: ADD_PROGRAM,
          payload: response.data.data,
        });
    } catch (error) {
      console.log(error);
      toast.error('Unable to add program!');
    }
  };

  export const addSprint =
  (name, programId) =>
  async (dispatch) => {
    try {
      const token = localStorage.getItem('pulseToken');
      console.log('executed addSprint', name, programId)
      const response = await axios.post(
        `${baseUrl}/api/v1/sprint`,
        {
          name,
          programId,
        },
        {
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
        dispatch({
          type: ADD_SPRINT,
          payload: response.data.data,
        });
        toast.success('Sprint created successfully');
    } catch (error) {
      const errorMessage = error.response.data.message || 'Unable to add sprint';
      console.log(error);
      toast.error(errorMessage);
    }
  };

export const fetchAllUsers = () => async (dispatch) => {
  dispatch({
    type: FETCH_ALL_USERS_PENDING,
    payload: ''
  });
  try {
    const token = localStorage.getItem('pulseToken');
    const res = await axios.get(`${baseUrl}/api/v1/users/all`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': `${process.env.API_URL}`
      }
    });
    const { data } = res;

    if (data) {
      const users = [];
      data.data.forEach((user) => {
        if (user.role === 'Trainee') {
          users.push(user);
        }
      });
      dispatch({
        type: FTECH_ALL_USER_SUCCESS,
        payload: users
      });
    } else {
      dispatch({
        type: FETCH_ALL_USERS_FAILED,
        payload: []
      });
    }
  } catch (error) {
    console.log('the response is : ', error);
  }
};

export const exportTraineeRatings = (id, timeRange) => async (dispatch) => {
  const token = localStorage.getItem('pulseToken');
  dispatch({
    type: EXPORT_TRAINEE_RATINGS_PENDING,
    payload: ''
  });
  try {
    const res = await axios.get(
      `${baseUrl}/api/v1/users/${id}/ratings/?from=${timeRange.from}&to=${timeRange.to}`,
      {
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': `${process.env.API_URL}`
        }
      }
    );
    const { data } = res;

    if (data && data.data.ratings.length) {
      dispatch({
        type: EXPORT_TRAINEE_RATINGS_SUCCESS,
        payload: data.data.ratings
      });
      toast.success(`Ratings retrieved successfully, click download`);
    } else {
      toast.error(`No ratings available in that time range`);
    }
  } catch (error) {
    toast.error(`Error while retriving data, select start and end dates`);
    dispatch({
      type: EXPORT_TRAINEE_RATINGS_FAILED,
      payload: []
    });
  }
};
