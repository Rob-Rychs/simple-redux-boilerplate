import * as types from './types';

export const initialState = {
  posts: [],
  error: null,
  isLoading: false,
};

const homePageReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_POSTS_INITATE: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case types.FETCH_POSTS_COMPLETE: {
      return {
        ...state,
        isLoading: false,
        posts: action.payload,
      };
    }
    case types.FETCH_POSTS_FAILURE: {
      return {
        ...state,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export default homePageReducer;
