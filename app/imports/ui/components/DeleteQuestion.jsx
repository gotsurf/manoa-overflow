import React from 'react';
import { Answers, AnswerSchema } from '/imports/api/answer/answer';
import { Ratings, RatingSchema } from '../../api/rating/rating';
import { Segment, Modal, Button } from 'semantic-ui-react';
import { Bert } from 'meteor/themeteorchef:bert';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';

class DeleteQuestion extends React.Component {

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
      Bert.alert({ type: 'danger', message: `Delete failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Delete succeeded' });
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
        <Modal trigger={<Button>Delete Question</Button>} style={modalStyle.modal}>
          <Modal.Header>WARNING WARNING WARNING WARNING WARNING</Modal.Header>
          <Modal.Content>
            <p>Are you sure you wish to delete?</p>
            <Button onClick={() => {
              this.deleteQ()
            }}>Confirm</Button>
            <p>Press Esc to Cancel</p>
          </Modal.Content>
        </Modal>
    );
  }

  deleteQ() {
    const answers = Answers.filter({ questionId: this.questionId }).fetch();
    answers.each(function (answer) {
      const ratings = Ratings.filter({ type: 'Answer', typeId: answer.typeId });
      ratings.each(function (rate) {
        Ratings.remove(rate._id);
      });
      Answers.remove(answer._id);
    });
    const aRatings = Ratings.filter({ type: 'Question', typeId: this.questionId });
    aRatings.each(function (rating) {
      Ratings.remove(rating._id);
    });

  }

  render() {
    return (
        <div>
          {Meteor.user() ? this.renderModal() : ''}
        </div>
    );
  }
}

DeleteQuestion.propTypes = {
  questionId: PropTypes.object.isRequired,

};

export default DeleteQuestion;
