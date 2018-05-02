import React from 'react';
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

class DeleteAnswer extends React.Component {


  /** Notify the user of the results of the submit. If successful, clear the form. */
  insertCallback(error) {
    if () {
      Bert.alert({ type: 'danger', message: `Delete failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Delete succeeded' });
      this.formRef.reset();
    }
  }

  /** On submit, insert the data. */
  submit(data) {
    const { name, question, dateCreated, owner, courseId, courseName, _id } = data;
    Questions.update(_id, {
      $set: {
        name: name, question: question, dateCreated: dateCreated,
        owner: owner, courseId: courseId, courseName: courseName
      }
    }, this.insertCallback);
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
        <Modal trigger={<a style={{ float: 'right' }}>(Delete Question)</a>} style={modalStyle.modal}>
          <Modal.Header>Delete Answer</Modal.Header>
          <Modal.Content>
            <AutoForm ref={(ref) => {
              this.formRef = ref;
            }} schema={QuestionSchema} onSubmit={this.submit} model={this.props.question}>
              <SubmitField value='Delete'/>

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

  DeleteAnswer.propTypes = {
    question: PropTypes.object.isRequired,

  };

  export default DeleteAnswer;
