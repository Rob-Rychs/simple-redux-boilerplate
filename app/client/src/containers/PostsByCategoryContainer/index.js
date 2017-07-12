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
    console.log(category);
    if (category)
      this.props.actions.fetchPostsByCategory(category); //eslint-disable-line
    else this.props.actions.fetchPostsByCategoryFailure(); //eslint-disable-line
  }

  handleSort = value => {
    console.log(value);
    this.props.actions.setSortByKey(value); //eslint-disable-line
  };

  render() {
    const { isLoading, error, posts, sortBy } = this.props; // eslint-disable-line
    return (
      <div style={{ margin: 20 }}>
        <div><Link to="/posts">Home</Link></div>
        <div>
          {error && !isLoading ? <div>{error.message}</div> : <noscript />}
        </div>
        <div>
          <select
            value={sortBy || 'none'}
            onChange={e => this.handleSort(e.target.value)}
          >
            <option value="none" disabled>Sort By...</option>
            <option value="timestamp">Date</option>
            <option value="voteScore">Votes</option>
            <option value="remove">None</option>
          </select>
        </div>
        {isLoading ? <h4>Loading...</h4> : <PostsByCategory posts={posts} />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.postsByCategoryContainer.posts,
  isLoading: state.postsByCategoryContainer.isLoading,
  error: state.postsByCategoryContainer.error,
  sortBy: state.postsByCategoryContainer.sortBy,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(PostsByCategoryActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  PostsByCategoryContainer,
);
