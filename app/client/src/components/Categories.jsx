import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CategoriesList = ({ categories }) => (
  <div>
    <ul>
      {categories &&
        categories.map(category => (
          <li key={category.name}>
            <Link to={`/category/${category.path}`}>{category.name}</Link>
          </li>
        ))}
    </ul>
  </div>
);

CategoriesList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CategoriesList;
