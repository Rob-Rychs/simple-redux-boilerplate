/* eslint-disable */
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as LoadCommentActions from './actions';
// import { min15, max100, required } from '../../utils/validations';
// import EditCommentForm from '../../components/EditCommentForm';

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

class EditCommentFormContainer extends Component {
  componentDidMount() {
    const { actions, match: { params: { commentId } } } = this.props; //eslint-disable-line
    actions.loadComment(commentId);
  }
  handleSubmit = values => {
    const {
      actions,
      comment,
      err,
      match: { params: { commentId } },
    } = this.props; //eslint-disable-line
    actions.updateComment(values);
    if (comment && !err) {
      console.log('success');
      this.context.router.history.push(`/posts/${comment.parentId}`);
    }
  };
  render() {
    return (
      <div>
        <Link to={`/posts/${this.props.comment.parentId}`}>Back</Link>
        {this.props.isLoading //eslint-disable-line
          ? <h2>Loading...</h2>
          : <div style={{ margin: 20 }}>
              <h1>Edit Comment</h1>
              <hr />
              {this.props.error && <strong>{this.props.error}</strong>}
              <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
                <div>
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
  if (!values.body) errors.body = 'Required';
  if (!values.author) errors.author = 'Required';
  return errors;
};

EditCommentFormContainer.contextTypes = {
  router: PropTypes.shape({
    history: PropTypes.object.isRequired,
  }),
};

//eslint-disable-next-line
EditCommentFormContainer = reduxForm({
  form: 'editCommentForm',
  validate,
  enableReinitialize: true,
})(EditCommentFormContainer);

const mapStateToProps = state => ({
  comment: state.editCommentContainer.comment,
  isLoading: state.editCommentContainer.isLoading,
  error: state.editCommentContainer.error,
  initialValues: state.editCommentContainer.comment,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(LoadCommentActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  EditCommentFormContainer,
);
