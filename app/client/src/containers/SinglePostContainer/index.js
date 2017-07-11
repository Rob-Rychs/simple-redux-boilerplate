import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types'; //eslint-disable-line
// import { Link } from 'react-router-dom';
import SinglePost from '../../components/SinglePost';
import * as SinglePostActions from './actions';

class SinglePostContainer extends Component {
  componentDidMount() {
    const { actions, match } = this.props; //eslint-disable-line
    console.log(match.params.postId);
    actions.fetchPostDetails(match.params.postId);
  }
  render() {
    const { post, comments, isLoading, error } = this.props; // eslint-disable-line
    return (
      <div>
        <div>
          {error && !isLoading ? <h2>{error.message}</h2> : <noscript />}
        </div>
        {isLoading
          ? <h2>Loading...</h2>
          : <SinglePost {...post} comments={comments} />}
      </div>
    );
  }
}

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
