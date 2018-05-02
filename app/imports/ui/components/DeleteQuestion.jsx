import React from 'react';
import { Roles } from 'meteor/alanning:roles';
import { Modal, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Answers } from '/imports/api/answer/answer';
import _ from 'lodash';
import { Ratings } from '../../api/rating/rating';
import { Questions } from '../../api/question/question';

class DeleteQuestion extends React.Component {

  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.render = this.render.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
  }

  /** Notify the user of the results of the submit. If successful, clear the form. */
  insertCallback(error) {
    if (error) {
      console.log(error);
    } else {
      console.log('success');
    }
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
        <Modal trigger={<Button color='red'>Delete Question</Button>} style={modalStyle.modal}>
          <Modal.Content>
            <p>Are you sure you want to delete this question?</p>
            <p>(Press Esc to Cancel)</p>
            <Button onClick={() => {
              this.deleteQ();
            }}>Delete</Button>
          </Modal.Content>
        </Modal>
    );
  }

  deleteQ() {
    const insertCallback = () => this.insertCallback;
    const answers = Answers.find({ questionId: this.props.questionId }).fetch();
    console.log(`Removing ${answers.length} answers for this question...`);
    _.each(answers, function (answer) {
      const ratings = Ratings.find({ type: 'Answer', typeId: answer._id }).fetch();
      let removed = 0;
      _.each(ratings, function (rate) {
        Ratings.remove(rate._id, insertCallback);
        removed++;
      });
      console.log(`${removed} answer ratings removed.`);
      Answers.remove(answer._id, insertCallback());
    });
    const qRatings = Ratings.find({ type: 'Question', typeId: this.props.questionId }).fetch();
    console.log(`Removing ${qRatings.length} ratings for this question...`);
    _.each(qRatings, function (rating) {
      Ratings.remove(rating._id, insertCallback);
    });
    console.log('Removing question...');
    Questions.remove(this.props.questionId, this.insertCallback);
    console.log('complete.');
    if (this.props.courseId) {
      // eslint-disable-next-line
      window.location.href = `/course/${this.props.courseId}`;
    } else {
      // eslint-disable-next-line
      window.location.href = '/admin/';
    }
  }

  render() {
    const isLogged = Meteor.userId() !== null;
    const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
    return (
        <div>
          {isLogged && isAdmin ? this.renderModal() : ''}
        </div>
    );
  }
}

DeleteQuestion.propTypes = {
  questionId: PropTypes.string.isRequired,
  courseId: PropTypes.string,
};

export default withTracker(function () {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Answers');
  const subscription1 = Meteor.subscribe('Rating');
  return {
    ready: (subscription.ready() && subscription1.ready()),
  };
})(DeleteQuestion);
