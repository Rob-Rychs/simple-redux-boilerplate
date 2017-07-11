import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import 'whatwg-fetch';
import HomePage from '../../components/HomePage';
import Categories from '../../components/Categories';
import * as HomePageActions from './actions';
import * as CategoriesActions from '../CategoriesContainer/actions';

class HomePageContainer extends Component {
  componentDidMount() {
    const { actions } = this.props;
    actions.fetchCategories();
    actions.fetchPostsInitiation(); // just to show loading message for a while
    setTimeout(() => {
      actions.fetchPosts();
    }, 2000);
  }
  render() {
    const { isLoading, error, posts, categories } = this.props;
    return (
      <div>
        <div>
          <Categories categories={categories} />
        </div>
        <div>
          {error && !isLoading ? <p>{error.message}</p> : <noscript />}
        </div>
        <div>
          {isLoading && !error
            ? <h1>Loading...</h1>
            : <HomePage posts={posts} />}
        </div>
      </div>
    );
  }
}

HomePageContainer.propTypes = {
  posts: PropTypes.array.isRequired, //eslint-disable-line
  categories: PropTypes.array.isRequired, //eslint-disable-line
  actions: PropTypes.object.isRequired, //eslint-disable-line
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.object, //eslint-disable-line
};

const mapStateToProps = state => ({
  posts: state.homePageContainer.posts,
  categories: state.categoriesContainer.categories,
  isLoading: state.homePageContainer.isLoading,
  error: state.homePageContainer.error,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    Object.assign({}, HomePageActions, CategoriesActions),
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePageContainer);
