import * as types from './types';

export const initialState = {
  posts: [],
  isLoading: false,
  error: null,
};

const postsByCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_POSTS_BY_CATEGORY_INIT: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case types.FETCH_POSTS_BY_CATEGORY_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: null,
        posts: action.payload,
      };
    }
    case types.FETCH_POSTS_BY_CATEGORY_FAILURE: {
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

export default postsByCategoryReducer;
