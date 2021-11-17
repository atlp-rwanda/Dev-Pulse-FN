import { GET_ENGINEERS } from '../actions/actionType';

const initialState = {
  engineers: [],
  errors: {},
};
const getRatingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ENGINEERS:{
      console.log("getting enginners Ratings: Engineers")
      return { ...state, engineers: action.payload.data.data };}
    default:
      return state;
  }
};
export default getRatingsReducer;
