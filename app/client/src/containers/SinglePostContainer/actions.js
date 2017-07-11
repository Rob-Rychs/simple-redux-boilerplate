import * as types from './types';

export const fetchPostInit = () => ({
  type: types.FETCH_POST_INIT,
});

export const fetchCommentsOnPostInit = () => ({
  type: types.FETCH_POST_COMMENTS_INIT,
});

export const fetchPostFailure = err => ({
  type: types.FETCH_POST_FAILURE,
  payload: err,
});

export const fetchCommentsOnPostFailure = err => ({
  type: types.FETCH_POST_COMMENTS_FAILURE,
  payload: err,
});

export const fetchPostSuccess = post => ({
  type: types.FETCH_POST_SUCCESS,
  payload: post,
});

export const fetchCommentsOnPostSuccess = comments => ({
  type: types.FETCH_POST_COMMENTS_SUCCESS,
  payload: comments,
});

export const fetchPostDetails = postId => dispatch => {
  dispatch(fetchPostInit());
  fetch(`http://localhost:5001/posts/${postId}`, {
    headers: {
      Authorization: 'bar',
    },
  })
    .then(res => res.json())
    .then(post => dispatch(fetchPostSuccess(post)))
    .catch(err => dispatch(fetchPostFailure(err)));

  fetch(`http://localhost:5001/posts/${postId}/comments`, {
    headers: {
      Authorization: 'bar',
    },
  })
    .then(res => res.json())
    .then(comments => dispatch(fetchCommentsOnPostSuccess(comments)))
    .catch(err => dispatch(fetchCommentsOnPostFailure(err)));
};
