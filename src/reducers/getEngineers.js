import { FETCH_RATING, GET_ENGINEERS } from '../actions/actionType';

const initialState = {
  engineers: [],
  errors: {},
  allRatings: [],
};
const getRatingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ENGINEERS:{
      console.log("getting enginners Ratings: Engineers")
      return { ...state, engineers: action.payload.data.data };}
    case FETCH_RATING: {
      return { ...state, allRatings: action.payload.data }; }
    default:
      return state;
  }
};
export default getRatingsReducer;
