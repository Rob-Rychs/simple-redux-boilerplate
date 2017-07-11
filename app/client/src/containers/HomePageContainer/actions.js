import * as types from './types';

export const fetchPostsInitiation = () => ({
  type: types.FETCH_POSTS_INITATE,
});

export const fetchPostsComplete = posts => ({
  type: types.FETCH_POSTS_COMPLETE,
  payload: posts,
});

export const fetchPostsFailure = error => ({
  type: types.FETCH_POSTS_FAILURE,
  payload: error,
});
