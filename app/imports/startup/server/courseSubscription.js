import { Meteor } from 'meteor/meteor';
import { CourseSubscriptions } from '../../api/courseSubscription/courseSubscription.js';

/** This subscription publishes all courseSubs belonging to the user */
Meteor.publish('CourseSubscriptions', function publish() {
  if (Meteor.user()) {
    return CourseSubscriptions.find({ userId: Meteor.user()._id });
  }
  return this.ready();
});
