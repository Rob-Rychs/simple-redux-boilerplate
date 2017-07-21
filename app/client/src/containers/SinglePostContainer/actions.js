import * as types from './types';
import getToken from '../../utils/getToken';

export const fetchPostInit = () => ({
  type: types.FETCH_POST_INIT,
});

export const fetchPostFailure = err => ({
  type: types.FETCH_POST_FAILURE,
  payload: err,
});

export const fetchPostSuccess = post => ({
  type: types.FETCH_POST_SUCCESS,
  payload: post,
});

export const deletePostInit = () => ({
  type: types.DELETE_POST_INIT,
});

export const deletePostFailure = err => ({
  type: types.DELETE_POST_FAILURE,
  payload: err,
});

export const deletePostSuccess = post => ({
  type: types.DELETE_POST_SUCCESS,
  payload: post,
});

export const fetchCommentsOnPostInit = () => ({
  type: types.FETCH_POST_COMMENTS_INIT,
});

export const fetchCommentsOnPostFailure = err => ({
  type: types.FETCH_POST_COMMENTS_FAILURE,
  payload: err,
});

export const fetchCommentsOnPostSuccess = comments => ({
  type: types.FETCH_POST_COMMENTS_SUCCESS,
  payload: comments,
});

export const newCommentInit = () => ({
  type: types.NEW_COMMENT_INIT,
});

export const newCommentSuccess = comment => ({
  type: types.NEW_COMMENT_SUCCESS,
  payload: comment,
});

export const newCommentFailure = err => ({
  type: types.NEW_COMMENT_FAILURE,
  payload: err,
});

export const deleteCommentSuccess = (id, msg) => ({
  type: types.DELETE_COMMENT_SUCCESS,
  payload: {
    id,
    msg,
  },
});

export const deleteCommentFailure = err => ({
  type: types.DELETE_COMMENT_FAILURE,
  payload: err,
});

export const voteOnPostSuccess = voteCount => ({
  type: types.VOTE_ON_POST_SUCCESS,
  payload: voteCount,
});

export const fetchPostDetails = postId => dispatch => {
  dispatch(fetchPostInit());
  fetch(`http://localhost:5001/posts/${postId}`, {
    headers: {
      Authorization: getToken(),
    },
  })
    .then(res => res.json())
    .then(post => {
      if (Object.keys(post).length > 0) {
        dispatch(fetchPostSuccess(post));
        fetch(`http://localhost:5001/posts/${postId}/comments`, {
          headers: {
            Authorization: getToken(),
          },
        })
          .then(res => res.json())
          .then(comments => dispatch(fetchCommentsOnPostSuccess(comments)))
          .catch(err => dispatch(fetchCommentsOnPostFailure(err)));
      } else
        dispatch(
          fetchPostFailure(
            'Either the post is deleted or there was problem loading the post...',
          ),
        );
    })
    .catch(err => dispatch(fetchPostFailure(err)));
};

export const deletePost = postId => dispatch => {
  dispatch(deletePostInit());
  fetch(`http://localhost:5001/posts/${postId}`, {
    headers: {
      Authorization: getToken(),
    },
    method: 'DELETE',
  })
    .then(res => {
      // console.log('Delete: ', JSON.stringify(res));
      if (Object.keys(res).length === 0) {
        dispatch(deletePostSuccess(null));
      } else {
        dispatch(deletePostFailure('Couldn\'t delete the post...'));
      }
    })
    .catch(err => dispatch(deletePostFailure(err)));
};

export const newComment = (newCommentData, postId) => dispatch => {
  dispatch(newCommentInit());
  if (!newCommentData || !postId) {
    dispatch(newCommentFailure('Missing data'));
  }
  const id = Math.random().toString(36).slice(2);
  const timestamp = Date.now();
  const data = JSON.stringify({
    id,
    timestamp,
    ...newCommentData,
    parentId: postId,
  });
  console.log(data);
  fetch('http://localhost:5001/comments', {
    method: 'POST',
    headers: {
      Authorization: getToken(),
      'Content-Type': 'application/json',
    },
    body: data,
  })
    .then(res => res.json())
    .then(commentResponse => {
      console.log(commentResponse);
      if (commentResponse.id === id) {
        dispatch(newCommentSuccess(commentResponse));
        fetch(`http://localhost:5001/posts/${postId}/comments`, {
          headers: {
            Authorization: getToken(),
          },
        })
          .then(res => res.json())
          .then(comments => dispatch(fetchCommentsOnPostSuccess(comments)))
          .catch(err => dispatch(fetchCommentsOnPostFailure(err)));
      } else {
        dispatch(newCommentFailure('Error posting new comment...'));
      }
    })
    .catch(err => dispatch(newCommentFailure(err)));
};

export const deleteComment = comment => dispatch => {
  fetch(`http://localhost:5001/comments/${comment.id}`, {
    headers: {
      Authorization: getToken(),
    },
    method: 'DELETE',
  })
    .then(res => res.json())
    .then(data => {
      console.log(JSON.stringify(data));
      if (data.deleted) {
        dispatch(deleteCommentSuccess(data.id, 'Successfully deleted'));
        // fetch(`http://localhost:5001/posts/${comment.parentId}/comments`, {
        //     headers: {
        //       Authorization: 'bar',
        //     },
        //   })
        //   .then(res => res.json())
        //   .then(comments => dispatch(fetchCommentsOnPostSuccess(comments)))
        //   .catch(err => dispatch(fetchCommentsOnPostFailure(err)));
      } else {
        dispatch(deleteCommentFailure('Error deleting comment...'));
      }
    })
    .catch(err => dispatch(deleteCommentFailure(err)));
};

export const voteOnPost = (voteKey, postId) => dispatch => {
  if (!voteKey || !postId) dispatch(fetchPostFailure('Missing params'));
  fetch(`http://localhost:5001/posts/${postId}`, {
    headers: {
      Authorization: getToken(),
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      option: voteKey,
    }),
  })
    .then(res => res.json())
    .then(post => {
      if (!post) dispatch(fetchPostFailure('Error while voting...'));
      else {
        dispatch(voteOnPostSuccess(post.voteScore));
      }
    })
    .catch(err => dispatch(fetchPostFailure(err)));
};

export const voteOnComment = (voteKey, commentId, postId) => dispatch => {
  if (!voteKey || !commentId) dispatch(fetchPostFailure('Missing params'));
  fetch(`http://localhost:5001/comments/${commentId}`, {
    headers: {
      Authorization: getToken(),
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      option: voteKey,
    }),
  })
    .then(res => res.json())
    .then(comment => {
      if (!comment)
        dispatch(
          fetchCommentsOnPostFailure('Error while voting on comment...'),
        );
      else {
        fetch(`http://localhost:5001/posts/${postId}/comments`, {
          headers: {
            Authorization: getToken(),
          },
        })
          .then(res => res.json())
          .then(comments => dispatch(fetchCommentsOnPostSuccess(comments)))
          .catch(err => dispatch(fetchCommentsOnPostFailure(err)));
      }
    })
    .catch(err => dispatch(fetchPostFailure(err)));
};
