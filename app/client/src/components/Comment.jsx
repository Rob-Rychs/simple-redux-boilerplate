import React from 'react';
import PropTypes from 'prop-types';

const Comment = ({ comment, onCommentDelete, onVoteComment }) => (
  <div key={comment.id}>
    {comment.voteScore} - {comment.body} - <b>{comment.author}</b>
    <div style={{ pading: 5, marginBottom: 3 }}>
      <select
        value="none"
        onChange={e => onVoteComment(e.target.value, comment.id)}
      >
        <option value="none" defaultChecked disabled>Vote...</option>
        <option value="upVote">Vote Up</option>
        <option value="downVote">Vote Down</option>
      </select>
      <button
        onClick={() => (window.location.href = `/comments/${comment.id}/edit`)}
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
        onClick={() => onCommentDelete(comment)}
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
  </div>
);

Comment.contextTypes = {
  router: PropTypes.shape({
    history: PropTypes.object.isRequired,
  }),
};

Comment.propTypes = {
  comment: PropTypes.object.isRequired, //eslint-disable-line
  onCommentDelete: PropTypes.func.isRequired,
  onVoteComment: PropTypes.func.isRequired,
};

export default Comment;
