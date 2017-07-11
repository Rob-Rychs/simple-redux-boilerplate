import React from 'react';
import PropTypes from 'prop-types';

const CategoriesList = ({ categories }) => (
  <div>
    <ul>
      {categories &&
        categories.map(category => (
          <li key={category.name}>{category.name}</li>
        ))}
    </ul>
  </div>
);

CategoriesList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CategoriesList;
