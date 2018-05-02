import React from 'react';
import { Roles } from 'meteor/alanning:roles';
import { Modal, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Answers } from '/imports/api/answer/answer';
import _ from 'lodash';
import { Ratings } from '../../api/rating/rating';

class DeleteAnswer extends React.Component {

  renderModal() {
    const modalStyle = {
      modal: {
        marginTop: '0px !important',
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    };

    return (
        <Modal trigger={<Button color='red'>Delete Answer</Button>} style={modalStyle.modal}>
          <Modal.Content>
            <p>Are you sure you want to delete this answer?</p>
            <p>(Press Esc to Cancel)</p>
            <Button onClick={() => {
              this.deleteA();
            }}>Delete</Button>
          </Modal.Content>
        </Modal>
    );
  }

  deleteA() {
    const aRatings = Ratings.find({ type: 'Answer', typeId: this.props.answerId }).fetch();
    _.each(aRatings, function (rating) {
      Ratings.remove(rating._id);
    });
    Answers.remove(this.props.answerId);
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

DeleteAnswer.propTypes = {
  answerId: PropTypes.string.isRequired,
};

export default withTracker(function () {
  const subscription = Meteor.subscribe('Ratings');
  return {
    ready: subscription.ready(),
  };
})(DeleteAnswer);
