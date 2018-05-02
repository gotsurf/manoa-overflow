import { Meteor } from 'meteor/meteor';
import { Answers } from '../../api/answer/answer.js';

/** This subscription publishes all answers */
Meteor.publish('Answers', function publish() {
  if (true) {
    return Answers.find();
  }
  return this.ready();
});
