import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';

const PostsByCategory = ({ posts }) => (
  <div style={{ margin: 20 }}>
    {posts && posts.length > 0
      ? posts.map(post => (
          <ul key={post.id}>
            <li>
              <Link to={`/posts/${post.id}`}>{post.title}</Link>
              {' '}
              -
              {' '}
              {moment.unix(post.timestamp).format('MM/DD, h:mm a')}
            </li>
          </ul>
        ))
      : <p>No Posts</p>}
  </div>
);

// "id": "6ni6ok3ym7mf1p33lnez",
//         "timestamp": 1468479767190,
//         "title": "Learn Redux in 10 minutes!",
//         "body": "Just kidding. It takes more than 10 minutes to learn technology.",
//         "author": "thingone",
//         "category": "redux",
//         "voteScore": -5,
//         "deleted": false

PostsByCategory.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      timestamp: PropTypes.any.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      author: PropTypes.string,
      category: PropTypes.string.isRequired,
      votescore: PropTypes.number,
      deleted: PropTypes.bool.isRequired,
    }),
  ).isRequired,
};

export default PostsByCategory;
