import * as types from './types';

export const fetchPostInit = () => ({
  type: types.FETCH_POST_INIT,
});

export const fetchPostFailure = err => ({
  type: types.FETCH_POST_FAILURE,
  payload: err,
});

export const fetchPostSuccess = post => ({
  type: types.FETCH_POST_SUCCESS,
  payload: post,
});

export const deletePostInit = () => ({
  type: types.DELETE_POST_INIT,
});

export const deletePostFailure = err => ({
  type: types.DELETE_POST_FAILURE,
  payload: err,
});

export const deletePostSuccess = post => ({
  type: types.DELETE_POST_SUCCESS,
  payload: post,
});

export const fetchCommentsOnPostInit = () => ({
  type: types.FETCH_POST_COMMENTS_INIT,
});

export const fetchCommentsOnPostFailure = err => ({
  type: types.FETCH_POST_COMMENTS_FAILURE,
  payload: err,
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
    .then(post => {
      if (Object.keys(post).length > 0) {
        dispatch(fetchPostSuccess(post));
        fetch(`http://localhost:5001/posts/${postId}/comments`, {
          headers: {
            Authorization: 'bar',
          },
        })
          .then(res => res.json())
          .then(comments => dispatch(fetchCommentsOnPostSuccess(comments)))
          .catch(err => dispatch(fetchCommentsOnPostFailure(err)));
      } else
        dispatch(
          fetchPostFailure(
            'Either the post is deleted or there was problem loading the post...',
          ),
        );
    })
    .catch(err => dispatch(fetchPostFailure(err)));
};

export const deletePost = postId => dispatch => {
  dispatch(deletePostInit());
  fetch(`http://localhost:5001/posts/${postId}`, {
    headers: {
      Authorization: 'bar',
    },
    method: 'DELETE',
  })
    .then(res => {
      // console.log('Delete: ', JSON.stringify(res));
      if (Object.keys(res).length === 0) {
        dispatch(deletePostSuccess(null));
      } else {
        dispatch(deletePostFailure('Couldn\'t delete the post...'));
      }
    })
    .catch(err => dispatch(deletePostFailure(err)));
};
