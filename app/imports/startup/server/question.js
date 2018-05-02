import { Meteor } from 'meteor/meteor';
import { Questions } from '../../api/question/question.js';

/** This subscription publishes all questions */
Meteor.publish('Questions', function publish() {
  return Questions.find();
});
