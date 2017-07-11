import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const PostsByCategory = ({ posts }) => (
  <div style={{ margin: 20 }}>
    {posts && posts.length > 0
      ? posts.map(post => (
          <div key={post.id}>
            <h3>
              {post.title}
              {' '}
              -
              {' '}
              {moment.unix(post.timestamp).format('MM/DD, h:mm a')}
            </h3>
            <p>{post.body}</p>
          </div>
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
      timestamp: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      votescore: PropTypes.number,
      deleted: PropTypes.bool.isRequired,
    }),
  ).isRequired,
};

export default PostsByCategory;
