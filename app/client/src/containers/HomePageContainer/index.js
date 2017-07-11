import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import 'whatwg-fetch';
import HomePage from '../../components/HomePage';
import * as HomePageActions from './actions';

const API_URL = 'http://localhost:5001';

class HomePageContainer extends Component {
  componentDidMount() {
    const { actions } = this.props;
    actions.fetchPostsInitiation();
    fetch(`${API_URL}/posts`, {
      headers: {
        Authorization: 'foo',
      },
    })
      .then(res => {
        console.log(`response: ${JSON.stringify(res)}`);
        actions.fetchPostsComplete(res.data);
      })
      .catch(err => {
        console.log(`error : ${err}`);
        actions.fetchPostsFailure(err);
      });
  }
  render() {
    const { isLoading, error, posts } = this.props;
    return (
      <div>
        {error && !isLoading ? <p>{error.message}</p> : <noscript />}
        {isLoading && !error ? <h1>Loading</h1> : <HomePage posts={posts} />}
      </div>
    );
  }
}

HomePageContainer.propTypes = {
  posts: PropTypes.oneOf([
    PropTypes.array.isRequired,
    PropTypes.object.isRequired,
  ]).isRequired,
  actions: PropTypes.object.isRequired, //eslint-disable-line
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.object.isRequired, //eslint-disable-line
};

const mapStateToProps = state => ({
  posts: state.homePageContainer.posts,
  isLoading: state.homePageContainer.isLoading,
  error: state.homePageContainer.error,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(HomePageActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePageContainer);
