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
    alert(JSON.stringify(values));
    const { actions, match: { params: { postId } } } = this.props;
    actions.newComment(values, postId);
  }
  render() {
    const {
      post,
      comments,
      isLoading,
      error,
      match: { params: { postId } },
    } = this.props;
    return (
      <div>
        <div>
          {error //eslint-disable-line
            ? <h2 style={{ margin: 20 }}>
                {error.message ? error.message : error}
              </h2>
            : isLoading
                ? <h2>Loading...</h2>
                : <SinglePost
                    {...post}
                    comments={comments}
                    onDelete={this.handleDelete}
                    onEdit={() =>
                      (window.location.href = `/posts/${postId}/edit`)}
                    doSubmit={this.handleSubmit}
                  />}
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
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(SinglePostActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  SinglePostContainer,
);
