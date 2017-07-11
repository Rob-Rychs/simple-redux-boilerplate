import React from 'react';
import PropTypes from 'prop-types';

const HomePage = ({ posts }) => (
  <div>
    {posts
      ? posts.map(post => <p key={post.id}>{post.title}</p>)
      : <p>No Posts</p>}
  </div>
);

HomePage.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default HomePage;
