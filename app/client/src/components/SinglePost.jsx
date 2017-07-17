import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import NewComment from './NewComment';
import Comment from './Comment';

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
  onDelete,
  onEdit,
  doSubmit,
  onCommentDelete,
  commentError,
  msg,
  voteKey,
  onVote,
}) => (
  <div style={{ margin: 20 }}>
    <div>
      <Link to="/posts">Home </Link>
    </div>
    <h3>{title} - <span>By - {author || 'Unknown'}</span></h3>
    <p>
      {timestamp
        ? moment.unix(timestamp).format('MM/DD, h:mm a')
        : 'Not Available'}
    </p>
    <div style={{ pading: 5, marginBottom: 3 }}>{body}</div>
    <p />
    <p>
      Category - <Link to={`/${category}/posts`}>{category || 'Random'}</Link>
    </p>
    <p>Vote: {voteScore || 0}</p>
    <div style={{ pading: 5, marginBottom: 3 }}>
      <select value={voteKey || 'none'} onChange={e => onVote(e.target.value)}>
        <option value="none" defaultChecked disabled>Vote...</option>
        <option value="upVote">Vote Up</option>
        <option value="downVote">Vote Down</option>
      </select>
      <button
        onClick={onEdit}
        style={{
          margin: 5,
          width: '70px',
          height: '35px',
          borderRadius: 2,
          borderStyle: 'none',
          color: 'white',
          backgroundColor: 'cornflowerblue',
        }}
      >
        Edit
      </button>
      <button
        onClick={onDelete}
        style={{
          margin: 5,
          width: '70px',
          height: '35px',
          borderRadius: 2,
          borderStyle: 'none',
          color: 'white',
          backgroundColor: 'red',
        }}
      >
        Delete
      </button>
    </div>
    <hr />
    <div>
      <NewComment doSubmit={doSubmit} />
      <hr />
      <div>
        {commentError && <p style={{ color: 'red' }}>{commentError}</p>}
        {msg && <p style={{ color: 'green' }}>{msg}</p>}
        {comments && comments.length > 0
          ? comments.map(comment => (
              <Comment
                key={comment.id}
                comment={comment}
                commentError={commentError}
                msg={msg}
                onCommentDelete={onCommentDelete}
              />
            ))
          : 'No Comments'}
      </div>
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
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  doSubmit: PropTypes.func.isRequired,
  onVote: PropTypes.func.isRequired,
  voteKey: PropTypes.string.isRequired,
  onCommentDelete: PropTypes.func.isRequired,
  commentError: PropTypes.string.isRequired,
  msg: PropTypes.string.isRequired,
};

export default SinglePost;
