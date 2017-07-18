import * as types from './types';
import getToken from '../../utils/getToken';

export const loadCommentInit = () => ({
  type: types.LOAD_COMMENT_DATA_INIT,
});

export const loadCommentSuccess = comment => ({
  type: types.LOAD_COMMENT_DATA_SUCCESS,
  payload: comment,
});

export const loadCommentFailure = err => ({
  type: types.LOAD_COMMENT_DATA_FAILURE,
  payload: err,
});

export const updateCommentInit = () => ({
  type: types.UPDATE_COMMENT_DATA_INIT,
});

export const updateCommentSuccess = comment => ({
  type: types.UPDATE_COMMENT_DATA_SUCCESS,
  payload: comment,
});

export const updateCommentFailure = err => ({
  type: types.UPDATE_COMMENT_DATA_FAILURE,
  payload: err,
});

export const loadComment = commentId => dispatch => {
  dispatch(loadCommentInit());
  fetch(`http://localhost:5001/comments/${commentId}`, {
    headers: {
      Authorization: getToken(),
    },
  })
    .then(res => res.json())
    .then(comment => {
      if (Object.keys(comment).length > 0) {
        dispatch(loadCommentSuccess(comment));
      } else
        dispatch(
          loadCommentFailure('There was problem loading the comment...'),
        );
    })
    .catch(err => dispatch(loadCommentFailure(err)));
};

export const updateComment = commentData => dispatch => {
  dispatch(updateCommentInit());
  fetch(`http://localhost:5001/comments/${commentData.id}`, {
    headers: {
      Authorization: getToken(),
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    body: JSON.stringify({ ...commentData }),
  })
    .then(res => res.json())
    .then(comment => {
      if (Object.keys(comment).length > 0) {
        dispatch(updateCommentSuccess(comment));
      } else
        dispatch(
          updateCommentFailure('There was problem updating the comment...'),
        );
    })
    .catch(err => dispatch(updateCommentFailure(err)));
};
