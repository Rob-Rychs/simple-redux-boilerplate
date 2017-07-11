import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types'; //eslint-disable-line
import { Link } from 'react-router-dom';
import * as PostsByCategoryActions from './actions';
import PostsByCategory from '../../components/PostsByCategory';

class PostsByCategoryContainer extends Component {
  componentDidMount() {
    const category = this.props.match.params.category || null; //eslint-disable-line
    console.log(category); // eslint-disable-line
    this.props.actions.fetchPostsByCategory(category); //eslint-disable-line
  }

  render() {
    const { isLoading, error, posts } = this.props; // eslint-disable-line
    return (
      <div style={{ margin: 20 }}>
        <div><Link to="/posts">Home</Link></div>
        {isLoading ? <h4>Loading...</h4> : <PostsByCategory posts={posts} />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.postsByCategoryContainer.posts,
  isLoading: state.postsByCategoryContainer.isLoading,
  error: state.postsByCategoryContainer.error,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(PostsByCategoryActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  PostsByCategoryContainer,
);
