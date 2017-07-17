/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import SinglePost from '../../components/SinglePost';
import * as SinglePostActions from './actions';

class SinglePostContainer extends Component {
  componentDidMount() {
    const { actions, match: { params: { postId } } } = this.props;
    console.log(postId);
    actions.fetchPostDetails(postId);
  }
  componentWillReceiveProps({ post }) {
    if (post === null) {
      this.context.router.history.push('/posts?deleted=true');
    }
  }
  handleDelete = e => {
    e.preventDefault();
    const { actions, match: { params: { postId } } } = this.props;
    actions.deletePost(postId);
  };
  handleSubmit = values => {
    const { actions, match: { params: { postId } } } = this.props;
    actions.newComment(values, postId);
  };
  handleCommentDelete = comment => {
    const { actions } = this.props;
    actions.deleteComment(comment);
  };
  handleOnVote = voteKey => {
    const { actions, match: { params: { postId } } } = this.props;
    actions.voteOnPost(voteKey, postId);
  };
  handleVoteComment = (voteKey, commentId) => {
    const { actions, match: { params: { postId } } } = this.props;
    actions.voteOnComment(voteKey, commentId, postId);
  };
  render() {
    const {
      post,
      comments,
      isLoading,
      error,
      match: { params: { postId } },
      commentError,
      msg,
    } = this.props;
    return (
      <div>
        <div>
          {error && //eslint-disable-line
            <h2 style={{ margin: 20, color: 'red' }}>
              {error.message ? error.message : error}
            </h2>}
          {isLoading && <h2>Loading...</h2>}
          <div>
            <SinglePost
              {...post}
              comments={comments}
              commentError={commentError}
              msg={msg}
              onDelete={this.handleDelete}
              onEdit={() =>
                this.context.router.history.push(`/posts/${postId}/edit`)}
              doSubmit={this.handleSubmit}
              onCommentDelete={this.handleCommentDelete}
              onVote={this.handleOnVote}
              onVoteComment={this.handleVoteComment}
            />
          </div>
        </div>
      </div>
    );
  }
}

SinglePostContainer.contextTypes = {
  router: PropTypes.shape({
    history: PropTypes.object.isRequired,
  }),
};

const mapStateToProps = state => ({
  post: state.singlePostContainer.post,
  comments: state.singlePostContainer.comments,
  isLoading: state.singlePostContainer.isLoading,
  error: state.singlePostContainer.error,
  commentError: state.singlePostContainer.commentError,
  msg: state.singlePostContainer.msg,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(SinglePostActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  SinglePostContainer,
);
