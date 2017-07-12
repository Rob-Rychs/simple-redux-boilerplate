import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

const NewPost = props => (
  <div>
    <form onSubmit={props.onSubmit}>
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
);

NewPost.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

// NewPost = reduxForm({
//   form: 'newPostForm',
// })(NewPost);

export default NewPost;
