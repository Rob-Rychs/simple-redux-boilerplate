import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import NewPost from '../../components/NewPost';

class NewPostContainer extends Component {
  doSubmit = values => {
    alert(JSON.stringify(values)); //eslint-disable-line
  };
  render() {
    return <NewPost doSubmit={this.doSubmit} />;
  }
}

export default NewPostContainer;
