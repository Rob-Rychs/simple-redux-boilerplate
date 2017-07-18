import * as types from './types';
import getToken from '../../utils/getToken';

export const newPostSubmitInit = () => ({
  type: types.SUBMIT_NEW_POST_INIT,
});

export const newPostSubmitSuccess = newPost => ({
  type: types.SUBMIT_NEW_POST_SUCCESS,
  payload: newPost,
});

export const newPostSubmitFailure = err => ({
  type: types.SUBMIT_NEW_POST_FAILURE,
  payload: err,
});

export const submitNewPost = newPostData => dispatch => {
  dispatch(newPostSubmitInit());
  if (!newPostData) dispatch(newPostSubmitFailure('Missing data'));
  const id = Math.random().toString(36).slice(2);
  const timestamp = Date.now();
  const data = JSON.stringify({
    id,
    timestamp,
    ...newPostData,
  });
  console.log(data);
  fetch('http://localhost:5001/posts', {
    method: 'POST',
    headers: {
      Authorization: getToken(),
      'Content-Type': 'application/json',
    },
    body: data,
  })
    .then(res => res.json())
    .then(newPost => {
      console.log(newPost);
      if (newPost.id === id) {
        dispatch(newPostSubmitSuccess(newPost));
      }
    })
    .catch(err => dispatch(newPostSubmitFailure(err)));
};
