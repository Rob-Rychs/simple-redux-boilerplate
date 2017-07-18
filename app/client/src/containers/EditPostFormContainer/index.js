/* eslint-disable */
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as LoadPostActions from './actions';
// import { min15, max100, required } from '../../utils/validations';
// import EditPostForm from '../../components/EditPostForm';

const renderTextField = ({
  input,
  textarea,
  label,
  type,
  meta: { touched, error, warning },
}) => {
  const textareaType = (
    <textarea rows="5" cols="50" {...input} placeholder={label} type={type} />
  );
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

class EditPostFormContainer extends Component {
  componentDidMount() {
    const { actions, match: { params: { postId } } } = this.props; //eslint-disable-line
    actions.loadPost(postId);
  }
  handleSubmit = values => {
    const { actions, post, err, match: { params: { postId } } } = this.props; //eslint-disable-line
    actions.updatePost(values);
    if (post && !err) {
      console.log('success');
      this.context.router.history.push(`/posts/${post.id}`);
    }
  };
  render() {
    return (
      <div>
        <Link to={`/posts/${this.props.post.id}`}>Back</Link>
        {this.props.isLoading //eslint-disable-line
          ? <h2>Loading...</h2>
          : <div style={{ margin: 20 }}>
              <h1>Edit Post</h1>
              <hr />
              {this.props.error && <strong>{this.props.error}</strong>}
              <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
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
                    disabled={this.props.submitting}
                  >
                    Edit
                  </button>
                </div>
              </form>
            </div>}

      </div>
    );
  }
}

const validate = values => {
  const errors = {};
  const category = ['react', 'redux', 'udacity'];
  if (!values.title) errors.title = 'Required';
  if (!values.body) errors.body = 'Required';
  if (!values.author) errors.author = 'Required';
  if (!category.includes(values.category))
    errors.category = `Category should be from following: ${category.join(', ')}`;
  return errors;
};

EditPostFormContainer.contextTypes = {
  router: PropTypes.shape({
    history: PropTypes.object.isRequired,
  }),
};

//eslint-disable-next-line
EditPostFormContainer = reduxForm({
  form: 'editPostForm',
  validate,
  enableReinitialize: true,
})(EditPostFormContainer);

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
