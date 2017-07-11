import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PostsList = ({ posts }) => (
  <div>
    <ul>
      {posts
        ? posts.map(post => (
            <Link to={`/posts/${post.id}`}>
              <li style={{ margin: 10 }} key={post.id}>{post.title}</li>
            </Link>
          ))
        : <p>No Posts</p>}
    </ul>
  </div>
);

PostsList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PostsList;
