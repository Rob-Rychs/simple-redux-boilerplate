import * as types from './types';

export const initialState = {
  isSubmitting: false,
  error: null,
  post: null,
};

const newPostReducder = (state = initialState, action) => {
  switch (action.type) {
    case types.SUBMIT_NEW_POST_INIT: {
      return {
        ...state,
        isSubmitting: true,
      };
    }
    case types.SUBMIT_NEW_POST_SUCCESS: {
      return {
        ...state,
        isSubmitting: false,
        post: action.payload,
      };
    }
    case types.SUBMIT_NEW_POST_FAILURE: {
      return {
        ...state,
        isSubmitting: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export default newPostReducder;
