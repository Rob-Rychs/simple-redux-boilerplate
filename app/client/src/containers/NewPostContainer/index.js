import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
// import NewPost from '../../components/NewPost';

const form = reduxForm({
  form: 'newPostForm',
});

class NewPostContainer extends Component {
  handleSubmit = values => {
    console.log(values);
  };
  render() {
    return (
      <div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="postTitle">Title</label>
              <Field name="postTitle" component={React.DOM.input} type="text" />
            </div>
            <div>
              <label htmlFor="postBody">Body</label>
              <Field name="postBody" component={React.DOM.input} type="text" />
            </div>
            <div>
              <label htmlFor="category">Category</label>
              <Field name="category" component={React.DOM.input} type="text" />
            </div>
            <div>
              <label htmlFor="author">Author</label>
              <Field name="author" component={React.DOM.input} type="text" />
            </div>
            <button type="submit">Post!</button>
          </form>
        </div>
      </div>
    );
  }
}

// NewPostContainer = reduxForm({
//   form: 'newPostForm',
// });

export default form(NewPostContainer);
