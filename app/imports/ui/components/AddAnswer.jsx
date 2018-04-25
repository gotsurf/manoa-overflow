import React from 'react';
import { Answers, AnswerSchema } from '/imports/api/answer/answer';
import { Segment, Modal, Button } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import LongTextField from 'uniforms-semantic/LongTextField';
import { Bert } from 'meteor/themeteorchef:bert';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';

class AddAnswer extends React.Component {

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
      // eslint-disable-next-line
      window.location.reload(true);
    }
  }

  /** On submit, insert the data. */
  submit(data) {
    const { questionId, answer } = data;
    const dateCreated = Date.now();
    const owner = Meteor.user().username;
    Answers.insert({ questionId, answer, dateCreated, owner }, this.insertCallback);
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
        <Modal trigger={<Button>Add Answer</Button>} style={modalStyle.modal}>
          <Modal.Header>Add Answer</Modal.Header>
          <Modal.Content>
            <AutoForm ref={(ref) => {
              this.formRef = ref;
            }} schema={AnswerSchema} onSubmit={this.submit}>
              <Segment>
                <LongTextField name='answer'
                               label='Description (enclose your code snippets in backticks `like this`)'/>
                <SubmitField value='submit'/>
                <ErrorsField/>
                <HiddenField name='owner' value={Meteor.user().username}/>
                <HiddenField name='questionId' value={this.props.questionId}/>
                <HiddenField name='dateCreated' value={Date.now()}/>
              </Segment>
            </AutoForm>
          </Modal.Content>
        </Modal>
    );
  }

  render() {
    return (
        <div>
          {Meteor.user() ? this.renderModal() : ''}
        </div>
    );
  }
}

AddAnswer.propTypes = {
  questionId: PropTypes.string.isRequired,
};

export default AddAnswer;
