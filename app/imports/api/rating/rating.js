import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Ratings = new Mongo.Collection('Ratings');

/** Create a schema to constrain the structure of documents associated with this collection. */
const RatingSchema = new SimpleSchema({
  typeId: String,
  type: {
    type: String,
    allowedValues: ['Answer', 'Question'],
  },
    userId: String,
  /** true is an upvote, false is downvote, neutral the rating doesn't exist  */
  upvote: Boolean,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Ratings.attachSchema(RatingSchema);

/** Make the collection and schema available to other code. */
export { Ratings, RatingSchema };
