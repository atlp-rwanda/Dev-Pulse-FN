import { RATE_ENGINEER_SUCCESS } from './actionType';
import { apiCallError } from '../redux/actions/apiStatusAction';
import * as ratingApi from '../api/rateApi';
import { toast } from 'react-toastify';
import dbCall from '../config/dbCall';


// actions creator => this is what is dispatched
export const rateEngineerSuccess = (savedRatings) => {
  return { type: RATE_ENGINEER_SUCCESS, savedRatings };
};



//make a thunk to dispatch the RATE_ENGINEER action after hitting the rating API
export const rateEngineer = (ratings, sprint) => {
  return ratingApi
    .rateEngineer(ratings, sprint)
    .then((savedRatings) => {
      toast.success('Done Saving');
      return rateEngineerSuccess(savedRatings);
    })
    .catch((error) => {
      toast.error(error.response.data.message);
    });
};

export const updateRating=(ratings,id)=>async(dispatch)=> {
  try {
    const {data} = await dbCall.patch(`ratings/rate/${id}`,ratings);
    dispatch({ type: 'UPDATED_ENGINEER_RATING',payload:data });
    toast.success('Rate updated!');
  } catch (error) {
    toast.error(error.response?.data.message || error);
    throw error;
  }
};