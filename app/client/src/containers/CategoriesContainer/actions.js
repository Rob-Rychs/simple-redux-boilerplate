import * as types from './types';

const API_URL = 'http://localhost:5001';

export const loadCategoriesInitiation = () => ({
  type: types.LOAD_CATEGORIES_INITIATE,
});

export const loadCategoriesFailure = err => ({
  type: types.LOAD_CATEGORIES_FAILURE,
  payload: err,
});

export const loadCategoriesComplete = categories => ({
  type: types.LOAD_CATEGORIES_COMPLETE,
  payload: categories,
});

export const fetchCategories = () => dispatch => {
  dispatch(loadCategoriesInitiation());

  fetch(`${API_URL}/categories`, {
    headers: {
      Authorization: 'foo',
    },
  })
    .then(res => res.json())
    .then(res => res.categories)
    .then(categories => {
      dispatch(loadCategoriesComplete(categories));
    })
    .catch(err => dispatch(loadCategoriesFailure(err)));
};
