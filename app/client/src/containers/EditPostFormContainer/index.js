import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as LoadPostActions from './actions';
import EditPostForm from '../../components/EditPostForm';

class EditPostFormContainer extends Component {
  componentDidMount() {
    const { actions, match: { params: { postId } } } = this.props; //eslint-disable-line
    actions.loadPost(postId);
  }
  handleSubmit = e => {
    e.preventDefault();
    console.log('worked');
  };
  render() {
    return (
      <div>
        {this.props.isLoading //eslint-disable-line
          ? <h2>Loading...</h2>
          : <EditPostForm doSubmit={this.handleSubmit} />}

      </div>
    );
  }
}

const mapStateToProps = state => ({
  post: state.editPostContainer.post,
  isLoading: state.editPostContainer.isLoading,
  error: state.editPostContainer.error,
  initialValues: state.editPostContainer.post,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(LoadPostActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  EditPostFormContainer,
);
