import * as types from './types';

const API_URL = 'http://localhost:5001';

export const fetchPostsByCategoryInitiate = () => ({
  type: types.FETCH_POSTS_BY_CATEGORY_INIT,
});

export const fetchPostsByCategorySuccess = posts => ({
  type: types.FETCH_POSTS_BY_CATEGORY_SUCCESS,
  payload: posts,
});

export const fetchPostsByCategoryFailure = err => ({
  type: types.FETCH_POSTS_BY_CATEGORY_FAILURE,
  payload: err,
});

export const fetchPostsByCategory = category => dispatch => {
  dispatch(fetchPostsByCategoryInitiate());
  fetch(`${API_URL}/${category}/posts`, {
    headers: {
      Authorization: 'bar',
    },
  })
    .then(res => res.json())
    .then(posts => {
      dispatch(fetchPostsByCategorySuccess(posts));
    })
    .catch(err => dispatch(fetchPostsByCategoryFailure(err)));
};

export const setSortByKey = key => ({
  type: types.SET_SORT_BY,
  payload: key,
});
