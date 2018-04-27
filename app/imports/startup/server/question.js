import { Meteor } from 'meteor/meteor';
import { Questions } from '../../api/question/question.js';

/** This subscription publishes all courses */
Meteor.publish('Questions', function publish() {
  return Questions.find();
});
