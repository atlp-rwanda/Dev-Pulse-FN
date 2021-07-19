import { combineReducers } from 'redux';
import authReducer from './authReducer';
import engineersReducer from './engineerList';
import getRatingsReducer from './getEngineers';
import EngineerReducer from './EngineerReducer';
import fetchProfileReducer from './fetchProfileReducer';
import ratingReducer from './ratingReducer';
import createLFReducer from './createLFReducer';

export default combineReducers({
  auth: authReducer,
  getRatings: getRatingsReducer, // to be merged with ratings
  engineersReducer,
  engineer: EngineerReducer,
  ratings: ratingReducer,  // to me merged with getRatingsReducer
  createLF: createLFReducer,
  profile: fetchProfileReducer,
});
