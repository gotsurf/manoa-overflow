import { Meteor } from 'meteor/meteor';
import { Question } from '../../api/question/question.js';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name}`);
  Question.insert(data);
}

/** This subscription publishes all courses */
Meteor.publish('Questions', function publish() {
  if (true) {
    return Question.find();
  }
  return this.ready();
});
