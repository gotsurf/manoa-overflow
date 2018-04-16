import { Meteor } from 'meteor/meteor';
import { Courses } from '../../api/course/course.js';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name}`);
  Courses.insert(data);
}

/** Initialize the collection if empty. */
if (Courses.find().count() === 0) {
  if (Meteor.settings.courses) {
    console.log('Creating courses.');
    Meteor.settings.courses.map(data => addData(data));
  }
}

/** This subscription publishes all courses */
Meteor.publish('Courses', function publish() {
  if(true){
    return Courses.find();
  }
  return this.ready();
});
