import { Meteor } from 'meteor/meteor';
import { Questions } from '../../api/question/question.js';

/** This subscription publishes all courses */
Meteor.publish('Questions', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Questions.find( {owner: username });
  }
  return this.ready();
});
