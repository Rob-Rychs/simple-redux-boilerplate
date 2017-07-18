import sortBy from 'sort-by';
import * as types from './types';

export const initialState = {
  posts: [],
  isLoading: false,
  error: null,
  sortBy: 'none',
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
    case types.SET_SORT_BY: {
      if (action.payload === 'none') {
        return {
          ...state,
          sortBy: action.payload,
        };
      }
      const newPostsState = Object.assign([], state.posts);
      newPostsState.sort(sortBy(`-${action.payload}`));
      console.log(newPostsState);
      return {
        ...state,
        sortBy: action.payload,
        posts: newPostsState,
      };
    }
    default:
      return state;
  }
};

export default postsByCategoryReducer;
