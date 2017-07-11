import React from 'react';
import PropTypes from 'prop-types';

const PostsList = ({ posts }) => (
  <div>
    {posts
      ? posts.map(post => <p key={post.id}>{post.title}</p>)
      : <p>No Posts</p>}
  </div>
);

PostsList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PostsList;
