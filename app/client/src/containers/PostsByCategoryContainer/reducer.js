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
      console.log(state.posts);
      const sortBy = action.payload;
      const copyPosts = state.posts.map(post => Object.assign({}, post));
      console.log(copyPosts);
      const sortedPosts = copyPosts.sort((a, b) => {
        console.log('1:', a);
        console.log('2:', b);
        const score = a.voteScore - b.voteScore;
        console.log(score);
        return score;
      });
      console.log(sortedPosts);
      return {
        ...state,
        sortBy,
        posts: sortedPosts,
      };
    }
    default:
      return state;
  }
};

export default postsByCategoryReducer;
