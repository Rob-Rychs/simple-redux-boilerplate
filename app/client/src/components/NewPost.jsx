/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

const renderTextField = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
}) => (
  <div>
    <label htmlFor={label}>{label}: </label>
    <input {...input} placeholder={label} type={type} />
    {touched &&
      ((error &&
        <span>
          {error}
        </span>) ||
        (warning &&
          <span>
            {warning}
          </span>))}
  </div>
);

//eslint-disable-next-line
let NewPost = props => (
  <div style={{ margin: 20 }}>
    <h1>New Post</h1>
    <hr />
    <form onSubmit={props.handleSubmit(props.doSubmit)}>
      <Field
        name="title"
        type="text"
        component={renderTextField}
        label="Title"
      />
      <br />
      <div>
        <label>Body: </label>
        <Field
          name="body"
          component="textarea"
          placeholder="Body of your post..."
        />
      </div>
      <br />
      <Field
        name="author"
        type="text"
        component={renderTextField}
        label="Author"
      />
      <br />
      <Field
        name="category"
        type="text"
        component={renderTextField}
        label="Category"
      />
      <br />
      <div style={{ display: 'flex' }}>
        <button
          type="submit"
          style={{
            margin: 5,
            width: '70px',
            height: '35px',
            borderRadius: 2,
            borderStyle: 'none',
            color: 'white',
            backgroundColor: 'green',
          }}
        >
          Post!
        </button>
        <button
          type="reset"
          onClick={props.reset}
          style={{
            margin: 5,
            width: '70px',
            height: '35px',
            borderRadius: 2,
            borderStyle: 'none',
            color: 'white',
            backgroundColor: 'red',
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
);

NewPost.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  doSubmit: PropTypes.func.isRequired,
};

NewPost = reduxForm({
  form: 'newPostForm',
})(NewPost);

export default NewPost;
