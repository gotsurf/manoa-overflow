import React from 'react';
import { Ratings } from '/imports/api/rating/rating';
import { Bert } from 'meteor/themeteorchef:bert';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Icon } from 'semantic-ui-react';

class Voting extends React.Component {

  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.render = this.render.bind(this);
    this.submit = this.submit.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
  }

  /** Notify the user of the results of the submit. If successful, clear the form. */
  insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Rate failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Rate succeeded' });
      this.formRef.reset();
    }
  }

  /** On submit, insert the data. */
  submit(typeId, type, userId, upvote) {
    Ratings.insert(typeId, type, userId, upvote);
  }

  upVote() {
    const rating = this.hasRating();
    if (rating && !rating.upVote) {
      Ratings.remove(rating._id);
    } else if (Meteor.user() && !rating) {
      Ratings.insert({ typeId: this.props.typeId,
        type: this.props.type, userId: Meteor.user()._id, upvote: true });
    }
    return 0;
  }

  downVote() {
    return 0;
  }

  hasRating() {
    if (Meteor.user()) {
      const userId = Meteor.user()._id;
      return Ratings.find({ userId: userId, typeId: this.props.typeId }).fetch()[0];
    }
    return 0;
  }

  renderVoting() {
    return (
        <div>
          <span style={{ float: 'left' }}>
            <Icon name='thumbs up' onClick={this.upVote()}/>
          </span>
          <span>
            <Icon name='thumbs down'/>
          </span>
        </div>
    );
  }

  render() {
    return (
        <div>
          <div className="counter">
            Rating: {0}
          </div>
          {this.renderVoting()}
        </div>
    );
  }
}

Voting.propTypes = {
  typeId: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default withTracker(function () {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Ratings');
  return {
    ready: subscription.ready(),
  };
})(Voting);

