import * as types from './types';

export const initialState = {
  post: {},
  isLoading: false,
  error: null,
};

const editPostFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_POST_DATA_INIT: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case types.LOAD_POST_DATA_SUCCESS: {
      return {
        isLoading: false,
        error: null,
        post: action.payload,
      };
    }
    case types.LOAD_POST_DATA_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export default editPostFormReducer;
