import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CategoriesList = ({ categories }) => (
  <div>
    <ul style={{ display: 'flex', justifyContent: 'space-between' }}>
      {categories &&
        categories.map(category => (
          <li key={category.name}>
            <Link to={`/${category.path}/posts`}>
              <h4>{category.name}</h4>
            </Link>
          </li>
        ))}
    </ul>
  </div>
);

CategoriesList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CategoriesList;
