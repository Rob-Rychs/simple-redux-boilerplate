import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import NewPost from '../../components/NewPost';

class NewPostContainer extends Component {
  componentDidMount() {
    console.log('cDM');
  }
  render() {
    return (
      <div>
        <NewPost />
      </div>
    );
  }
}

export default NewPostContainer;
