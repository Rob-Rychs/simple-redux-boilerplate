import * as types from './types';

export const loadPostInit = () => ({
  type: types.LOAD_POST_DATA_INIT,
});

export const loadPostSuccess = post => ({
  type: types.LOAD_POST_DATA_SUCCESS,
  payload: post,
});

export const loadPostFailure = err => ({
  type: types.LOAD_POST_DATA_FAILURE,
  payload: err,
});

export const loadPost = postId => dispatch => {
  dispatch(loadPostInit());
  fetch(`http://localhost:5001/posts/${postId}`, {
    headers: {
      Authorization: 'bar',
    },
  })
    .then(res => res.json())
    .then(post => {
      if (Object.keys(post).length > 0) {
        dispatch(loadPostSuccess(post));
      } else dispatch(loadPostFailure('There was problem loading the post...'));
    })
    .catch(err => dispatch(loadPostFailure(err)));
};
