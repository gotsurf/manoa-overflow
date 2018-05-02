import React from 'react';
import { Link } from 'react-router-dom';
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
            {this.props.courseId ? (
                    <Link to={`/course/${this.props.courseId}`}>
                      <Button onClick={() => {
                        this.deleteQ();
                      }}>Delete</Button>
                    </Link>
                ) :
                (<Button onClick={() => {
                  this.deleteQ();
                }}>Delete</Button>)}
          </Modal.Content>
        </Modal>
    );
  }

  deleteQ() {
    const answers = Answers.find({ questionId: this.props.questionId }).fetch();
    _.each(answers, function (answer) {
      const ratings = Ratings.find({ type: 'Answer', typeId: answer._id }).fetch();
      _.each(ratings, function (rate) {
        Ratings.remove(rate._id);
      });
      Answers.remove(answer._id);
    });
    const qRatings = Ratings.find({ type: 'Question', typeId: this.props.questionId }).fetch();
    _.each(qRatings, function (rating) {
      Ratings.remove(rating._id);
    });
    Questions.remove(this.props.questionId);
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
