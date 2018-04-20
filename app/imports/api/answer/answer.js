import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Answers = new Mongo.Collection('Answers');

/** Create a schema to constrain the structure of documents associated with this collection. */
const AnswerSchema = new SimpleSchema({
  owner: String,
  questionId: String,
  answer: String,
  dateCreated: Date,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Answers.attachSchema(AnswerSchema);

/** Make the collection and schema available to other code. */
export { Answers, AnswerSchema };
