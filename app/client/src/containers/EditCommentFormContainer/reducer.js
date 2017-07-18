import * as types from './types';

export const initialState = {
  comment: {},
  isLoading: false,
  error: null,
};

const editCommentFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_COMMENT_DATA_INIT: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case types.LOAD_COMMENT_DATA_SUCCESS: {
      return {
        isLoading: false,
        error: null,
        comment: action.payload,
      };
    }
    case types.LOAD_COMMENT_DATA_FAILURE: {
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

export default editCommentFormReducer;
