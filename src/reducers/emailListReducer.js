import {
  ADD_EMAILS_ERROR,
  ADD_EMAILS_SUCCESS,
  FETCH_EMAILS_ERROR,
  FETCH_EMAILS_LOADING,
  FETCH_EMAILS_SUCCESS,
  REMOVE_EMAILS_ERROR,
  REMOVE_EMAILS_SUCCESS,
} from '../actions/actionType';

const initialState = {
  emails: [],
  fetchLoading: false,
  fetchError: '',
  addSuccess: {
    status: false,
    message: '',
  },
  addError: {
    status: false,
    message: '',
  },
  removeSuccess: {
    status: false,
    message: '',
  },
  removeError: {
    status: false,
    message: '',
  },
};
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_EMAILS_SUCCESS: {
      console.log('all emails from reducer, ', payload);
      return { ...state, fetchLoading: false, emails: payload };
    }
    case FETCH_EMAILS_ERROR: {
      console.log('errors from fetching, ', payload);

      return { ...state, fetchLoading: false, fetchError: 'failed to fetch emails' };
    }
    case FETCH_EMAILS_LOADING: {
      console.log('loading emails fetching');
      return { ...state, fetchLoading: true };
    }
    case ADD_EMAILS_SUCCESS: {
      console.log('emails add reducer', payload);
      return {
        ...state,
        emails: [...state.emails, ...payload.emails],
        addSuccess: { status: true, message: payload.message },
      };
    }
    case ADD_EMAILS_ERROR: {
      return { ...state, addError: { status: true, message: payload } };
    }
    case REMOVE_EMAILS_SUCCESS: {
      console.log('meail remove reducer', payload);
      // const remainEmails = state.emails.filter((e, i) => e.email !== payload.emails);
      const currentEmails = state.emails;
      const toRemoveEmails = payload.emails;
      const remainingEmails = currentEmails.filter((currEmail) => toRemoveEmails.filter((toRem) => toRem === currEmail.email).length === 0);
      return {
        ...state,
        emails: remainingEmails,
        removeSuccess: { status: true, message: payload.message },
      };
    }
    case REMOVE_EMAILS_ERROR: {
      return { ...state, removeError: { status: true, message: payload } };
    }
    default:
      return state;
  }
};
