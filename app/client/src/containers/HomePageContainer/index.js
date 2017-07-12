import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PostsList from '../../components/PostsList';
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
    }, 500);
  }
  render() {
    const { isLoading, error, posts, categories } = this.props;
    return (
      <div style={{ margin: 20 }}>
        <div>
          <Categories categories={categories} />
        </div>
        <div>
          <Link to="/newpost">New Post</Link>
        </div>
        <div>
          {error && !isLoading ? <p>{error.message}</p> : <noscript />}
        </div>
        <div>
          <h1>All Articles</h1>
          {isLoading && !error
            ? <h4>Loading...</h4>
            : <PostsList posts={posts} />}
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
