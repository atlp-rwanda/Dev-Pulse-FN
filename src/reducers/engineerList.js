import {
  MY_ENGINEERS, REMOVE_ENGINEERS, REPLACE_ENGINEERS, SAVE_ENGINEERS, GET_USERS,
  ADD_ENGINEER, REDIRECT_USER,
  SAVE_ENGINEERS_REQUEST, SAVE_ENGINEERS_SUCCESS, SAVE_ENGINEERS_FAILURE,
  REMOVE_ENGINEERS_REQUEST, REMOVE_ENGINEERS_SUCCESS, REMOVE_ENGINEERS_FAILURE
} from '../actions/actionType';

const initialState = {
  engineers: [],
  removed: [],
  users: [],
  isLoggedOut: false,

};

export default (state = initialState, action) => {
  const { type, payload } = action;
  let removed = [];
  let engineers = [];

  switch (type) {
    case GET_USERS: {
      //console.log("all users from reducer, ", payload)
      return { ...state, users: payload };
    }
    case MY_ENGINEERS: {
      // console.log("my engineer from reducer, ", payload)

      return { ...state, engineers: payload, removed };
    }

    // codes to remove engenners from the list by felix
    case REMOVE_ENGINEERS_REQUEST:
      return {
        Removing: true
      }
    case REMOVE_ENGINEERS_SUCCESS:
      engineers = state.engineers.filter((eng) => eng.id !== payload.id);
      removed = state.removed.concat([payload]);
      return { ...state, engineers, removed };

    case REMOVE_ENGINEERS_FAILURE:
      return {}

    //block code for flashing message by felix
    case SAVE_ENGINEERS_REQUEST:
      return { Saving: true };

    case SAVE_ENGINEERS_SUCCESS:

      return { ...state, engineers: payload, removed };

    case SAVE_ENGINEERS_FAILURE:
      return {};

    case REPLACE_ENGINEERS:

      removed = state.removed.filter((eng) => eng.id !== payload.id);
      engineers = state.engineers.concat([payload]);

      return { ...state, engineers, removed };


    case ADD_ENGINEER:
      return state.engineers.some(
        (eng) => parseInt(eng.id, 10) === parseInt(payload.id, 10)
      )
        ? state
        : { ...state, engineers: [...state.engineers, payload] };

    case REDIRECT_USER:
      localStorage.removeItem("pulseToken");
      return { ...state, isLoggedOut: payload.isLoggedOut, removed };

    default:
      return state;
  }
};
