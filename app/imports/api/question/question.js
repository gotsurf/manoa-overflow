import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Questions = new Mongo.Collection('Questions');

/** Create a schema to constrain the structure of documents associated with this collection. */
const QuestionSchema = new SimpleSchema({
  owner: String,
  courseId: String,
  courseName: String,
  name: String,
  question: String,
  dateCreated: Date,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Questions.attachSchema(QuestionSchema);

/** Make the collection and schema available to other code. */
export { Questions, QuestionSchema };
