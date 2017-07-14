import * as types from './types';

const API_URL = 'http://localhost:5001';

export const fetchPostsInitiation = () => ({
  type: types.FETCH_POSTS_INITIATE,
});

export const fetchPostsComplete = posts => ({
  type: types.FETCH_POSTS_COMPLETE,
  payload: posts,
});

export const fetchPostsFailure = error => ({
  type: types.FETCH_POSTS_FAILURE,
  payload: error,
});

export const fetchPosts = () => dispatch => {
  dispatch(fetchPostsInitiation());

  fetch(`${API_URL}/posts`, {
    headers: {
      Authorization: 'bar',
    },
  })
    .then(res => res.json())
    .then(posts => {
      dispatch(fetchPostsComplete(posts));
    })
    .catch(err => {
      console.log(`error : ${err}`);
      dispatch(fetchPostsFailure(err));
    });
};
