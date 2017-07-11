import * as types from './types';

export const initialState = {
  categories: [],
  error: null,
  isLoading: false,
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_CATEGORIES_INITIATE: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case types.LOAD_CATEGORIES_COMPLETE: {
      return {
        ...state,
        isLoading: false,
        error: null,
        categories: action.payload,
      };
    }
    case types.LOAD_CATEGORIES_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export default categoriesReducer;
