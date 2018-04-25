import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const courseSubscription = new Mongo.Collection('Course Subscription');

/** Create a schema to constrain the structure of documents associated with this collection. */
const courseSubscriptionSchema = new SimpleSchema({
  ownerId: String,
  courseSubId: String,
  dateSubscribed: Date,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
courseSubscription.attachSchema(courseSubscriptionSchema);

/** Make the collection and schema available to other code. */
export { courseSubscription, courseSubscriptionSchema };
