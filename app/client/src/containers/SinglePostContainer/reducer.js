import * as types from './types';

export const initialState = {
  post: {},
  comments: [],
  isLoading: false,
  error: null,
  commentError: null,
  msg: null,
};

const singlePostReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_POST_INIT: {
      return {
        ...state,
        isLoading: true,
        msg: null,
      };
    }
    case types.DELETE_POST_INIT: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case types.FETCH_POST_SUCCESS: {
      return {
        ...state,
        post: action.payload,
        isLoading: false,
        error: null,
      };
    }
    case types.DELETE_POST_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }
    case types.FETCH_POST_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }
    case types.DELETE_POST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        post: null,
      };
    }
    case types.FETCH_POST_COMMENTS_SUCCESS: {
      return {
        ...state,
        comments: action.payload,
      };
    }
    case types.FETCH_POST_COMMENTS_FAILURE: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case types.NEW_COMMENT_INIT: {
      return { ...state };
    }
    case types.NEW_COMMENT_SUCCESS: {
      return { ...state };
    }
    case types.NEW_COMMENT_FAILURE: {
      return {
        ...state,
        commentError: action.payload,
      };
    }
    case types.DELETE_COMMENT_FAILURE: {
      return {
        ...state,
        commentError: action.payload,
      };
    }
    case types.DELETE_COMMENT_SUCCESS: {
      return {
        ...state,
        comments: state.comments.filter(obj => obj.id !== action.payload.id),
        msg: action.payload.msg,
      };
    }
    case types.VOTE_ON_POST_SUCCESS: {
      return {
        ...state,
        post: { ...state.post, voteScore: action.payload },
      };
    }
    default:
      return state;
  }
};

export default singlePostReducer;
