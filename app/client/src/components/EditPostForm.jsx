/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
const { DOM: { input, select, textarea } } = React;
import { min15, max100, required } from '../utils/validations';
const renderTextField = ({
  input,
  textarea,
  label,
  type,
  meta: { touched, error, warning },
}) => {
  const textareaType = <textarea {...input} placeholder={label} type={type} />;
  const inputType = <input {...input} placeholder={label} type={type} />;
  return (
    <div>
      <label htmlFor={label}>{label}: </label>
      {textarea ? textareaType : inputType}
      {touched &&
        ((error &&
          <span style={{ color: 'red', marginLeft: 3 }}>
            {error}
          </span>) ||
          (warning &&
            <span>
              {warning}
            </span>))}
    </div>
  );
};

//eslint-disable-next-line
let EditPostForm = props => {
  console.log(`PROPS: ${JSON.stringify(props)}`);
  return (
    <div style={{ margin: 20 }}>
      <h1>Edit Post</h1>
      <hr />
      {props.error && <strong>{props.error}</strong>}
      <form onSubmit={props.handleSubmit(props.doSubmit)}>
        <div>
          <label>Title: </label>
          <input
            name="title"
            type="text"
            placeholder="Title..."
            value={props.post ? props.post.title : ''}
          />
        </div>
        <br />
        <div>
          <label>Body: </label>
          <textarea
            name="body"
            type="textarea"
            rows="5"
            cols="50"
            placeholder="Body..."
          >
            {props.post ? props.post.body : <noscript />}
          </textarea>
        </div>
        <br />
        <div>
          <label>Author: </label>
          <input
            name="author"
            type="text"
            placeholder="Author..."
            value={props.post ? props.post.author : ''}
          />
        </div>
        <br />
        <div>
          <label>Category: </label>
          <input
            name="category"
            type="text"
            placeholder="Category..."
            value={props.post ? props.post.category : ''}
          />
        </div>
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
            disabled={props.submitting}
          >
            Edit
          </button>
          <button
            type="reset"
            onClick={() => (window.location.href = '/posts')}
            style={{
              margin: 5,
              width: '70px',
              height: '35px',
              borderRadius: 2,
              borderStyle: 'none',
              color: 'white',
              backgroundColor: 'red',
            }}
            disabled={props.pristine || props.submitting}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

const validate = values => {
  const errors = {};
  const category = ['react', 'redux', 'udacity'];
  if (!values.title) errors.title = 'Required';
  if (!values.body) errors.body = 'Required';
  if (!values.author) errors.author = 'Required';
  if (!category.includes(values.category))
    errors.category = `Category should be from following: ${category.join(', ')}`;
  // Object.keys(values).map(key => {
  //   if (!values.key) errors.key = 'Required';
  // });
  return errors;
};

EditPostForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  doSubmit: PropTypes.func.isRequired,
};

EditPostForm = reduxForm({
  form: 'editPostForm',
  validate,
})(EditPostForm);

export default EditPostForm;
