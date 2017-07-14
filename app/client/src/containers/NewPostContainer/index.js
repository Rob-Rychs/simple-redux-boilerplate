/* eslint-disable */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as NewPostActions from './actions';
import NewPost from '../../components/NewPost';

class NewPostContainer extends Component {
  doSubmit = values => {
    console.log('form submitted');
    const { actions } = this.props;
    actions.submitNewPost(values);
    // alert(JSON.stringify(values));
  };

  componentWillReceiveProps({ post }) {
    if (post) {
      this.context.router.history.push(`/posts/${post.id}`);
    }
  }

  render() {
    const { isLoading, error } = this.props;
    return (
      <div>
        <Link to="/posts">Home</Link>
        <div>
          {error && <h2>{error.message}</h2>}
        </div>
        {!isLoading
          ? <NewPost doSubmit={this.doSubmit} />
          : <h2>Loading...</h2>}
      </div>
    );
  }
}

NewPostContainer.contextTypes = {
  router: PropTypes.shape({
    history: PropTypes.object.isRequired,
  }),
};

const mapStateToProps = state => ({
  isLoading: state.newPostContainer.isLoading,
  error: state.newPostContainer.error,
  post: state.newPostContainer.post,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(NewPostActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPostContainer);
