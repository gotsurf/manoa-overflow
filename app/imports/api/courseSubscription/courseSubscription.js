import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const CourseSubscriptions = new Mongo.Collection('CourseSubscriptions');

/** Create a schema to constrain the structure of documents associated with this collection. */
const CourseSubscriptionSchema = new SimpleSchema({
  userId: String,
  courseId: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
CourseSubscriptions.attachSchema(CourseSubscriptionSchema);

/** Make the collection and schema available to other code. */
export { CourseSubscriptions, CourseSubscriptionSchema };
