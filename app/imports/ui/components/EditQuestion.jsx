import React from 'react';
import { Questions, QuestionSchema } from '/imports/api/question/question';
import { Segment, Modal, Button } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import LongTextField from 'uniforms-semantic/LongTextField';
import { Bert } from 'meteor/themeteorchef:bert';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';

class EditQuestion extends React.Component {

  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.render = this.render.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
    this.formRef = null;
  }

  /** Notify the user of the results of the submit. If successful, clear the form. */
  insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Add failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Add succeeded' });
      this.formRef.reset();
    }
  }

  /** On submit, insert the data. */
  submit(data) {
    const { name, question, dateCreated, owner, courseId, courseName, _id } = data;
    Questions.update(_id, { $set: { name: name, question: question, dateCreated: dateCreated,
        owner: owner, courseId: courseId, courseName: courseName } }, this.insertCallback);
    // eslint-disable-next-line
    window.location.reload(true);
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderModal() {
    const modalStyle = {
      modal: {
        marginTop: '0px !important',
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    };

    return (
        <Modal trigger={<a>(Edit Question)</a>} style={modalStyle.modal}>
          <Modal.Header>Edit Question</Modal.Header>
          <Modal.Content>
            <AutoForm ref={(ref) => {
              this.formRef = ref;
            }} schema={QuestionSchema} onSubmit={this.submit} model={this.props.question}>
              <Segment>
                <TextField name='name' label='Title'/>
                <LongTextField name='question'
                               label='Description (enclose your code snippets in backticks `like this`)'/>
                <SubmitField value='submit'/>
                <ErrorsField/>
                <HiddenField name='owner' value={this.props.question.owner}/>
                <HiddenField name='courseId' value={this.props.question.courseId}/>
                <HiddenField name='dateCreated' value={this.props.question.dateCreated}/>
                <HiddenField name='courseName' value={this.props.question.courseName}/>
              </Segment>
            </AutoForm>
          </Modal.Content>
        </Modal>
    );
  }

  render() {
    return (
        <div>
          {Meteor.user() && (Meteor.user().username === this.props.question.owner) ? this.renderModal() : ''}
        </div>
    );
  }
}

EditQuestion.propTypes = {
  question: PropTypes.object.isRequired,

};

export default EditQuestion;
