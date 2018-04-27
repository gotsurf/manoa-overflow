import React from 'react';
import { Ratings } from '/imports/api/rating/rating';
import { Bert } from 'meteor/themeteorchef:bert';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Icon, Button } from 'semantic-ui-react';

class Voting extends React.Component {

  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.render = this.render.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
    this.state = {};
  }

  /** Notify the user of the results of the submit. If successful, clear the form. */
  insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Rate failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Rate succeeded' });
    }
    this.setState({});
  }

  upVote() {
    const rating = this.hasRating();
    if (rating && !rating.upvote) {
      Ratings.remove(rating._id, this.insertCallback);
    } else
      if (Meteor.user() && !rating) {
        Ratings.insert({
          typeId: this.props.typeId,
          type: this.props.type,
          userId: Meteor.user()._id,
          upvote: true,
        }, this.insertCallback);
      }
    return 0;
  }

  downVote() {
    const rating = this.hasRating();
    if (rating && rating.upvote) {
      Ratings.remove(rating._id, this.insertCallback);
    } else
      if (Meteor.user() && !rating) {
        Ratings.insert({
          typeId: this.props.typeId,
          type: this.props.type,
          userId: Meteor.user()._id,
          upvote: false,
        }, this.insertCallback);
      }
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
            <Button color='green' onClick={() => {
              this.upVote();
            }}>
             <Icon name='thumbs up'/>
            </Button>
          </span>
          <span>
            <Button color='red' onClick={() => {
              this.downVote();
            }}>
              <Icon name='thumbs down'/>
            </Button>
          </span>
        </div>
    );
  }

  render() {

    const ratings = Ratings.find({ typeId: this.props.typeId }).fetch();
    const upvotes = ratings.filter((r) => r.upvote === true).length;
    const downvotes = ratings.length - upvotes;
    const score = upvotes - downvotes;
    const scoreStyle = (score < 0 ? { color: 'red' } : {});

    return (
        <div>
          <div className="counter">
            Rating: <span style={scoreStyle}>{score}</span>
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

