/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
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
let EditPostForm = props => (
  <div style={{ margin: 20 }}>
    <h1>Edit Post</h1>
    <hr />
    {props.error && <strong>{props.error}</strong>}
    <form onSubmit={props.handleSubmit(props.doSubmit)}>
      <Field
        name="title"
        type="text"
        component={renderTextField}
        label="Title"
      />
      <br />
      <div>
        {/* <label>Body: </label> */}
        <Field
          name="body"
          type="textarea"
          component={renderTextField}
          label="Body"
          textarea
        />
        {/* <Field
          name="body"
          component="textarea"
          placeholder="Body of your post..."
        /> */}
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
  enableReinitialize: true,
})(EditPostForm);

export default EditPostForm;
