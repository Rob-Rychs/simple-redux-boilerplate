import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';

// "id": "6ni6ok3ym7mf1p33lnez",
// "timestamp": 1468479767190,
// "title": "Learn Redux in 10 minutes!",
// "body": "Just kidding. It takes more than 10 minutes to learn technology.",
// "author": "thingone",
// "category": "redux",
// "voteScore": -5,
// "deleted": false

const SinglePost = ({
  // id,
  timestamp,
  title,
  body,
  author,
  category,
  voteScore,
  comments, // eslint-disable-line
}) => (
  <div style={{ margin: 20 }}>
    <h3>{title}</h3>
    <p>
      {timestamp
        ? moment.unix(timestamp).format('MM/DD, h:mm a')
        : 'Not Available'}
    </p>
    <div>{body}</div>
    <p>By - {author || 'Unknown'}</p>
    <p>
      Category - <Link to={`/${category}/posts`}>{category || 'Random'}</Link>
    </p>
    <p>Vote: {voteScore || 0}</p>
    <hr />
    <div>
      {comments && comments.length > 0
        ? comments.map(comment => (
            <div>{comment.body} - <b>{comment.author}</b> <br /><br /></div>
          ))
        : 'No Comments'}
    </div>
  </div>
);

SinglePost.propTypes = {
  // id: PropTypes.string, // eslint-disable-line
  timestamp: PropTypes.any.isRequired, // eslint-disable-line
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  author: PropTypes.string, // eslint-disable-line
  category: PropTypes.string.isRequired,
  voteScore: PropTypes.number.isRequired,
};

export default SinglePost;
