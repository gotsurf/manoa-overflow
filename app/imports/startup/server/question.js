import { Meteor } from 'meteor/meteor';
import { Questions } from '../../api/question/question.js';

/** This subscription publishes all courses */
Meteor.publish('Questions', function publish() {
  if (true) {
    return Questions.find();
  }
  return this.ready();
});
