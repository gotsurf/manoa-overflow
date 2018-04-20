import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Question = new Mongo.Collection('Question');

/** Create a schema to constrain the structure of documents associated with this collection. */
const QuestionSchema = new SimpleSchema({
  owner: String,
  courseId: String,
  course: String,
  title: String,
  question: String,
  dateCreated: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Question.attachSchema(QuestionSchema);

/** Make the collection and schema available to other code. */
export { Question, QuestionSchema };
