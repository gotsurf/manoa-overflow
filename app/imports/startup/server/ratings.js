import { Meteor } from 'meteor/meteor';
import { Ratings } from '../../api/rating/rating.js';


/* eslint-disable no-console */

Meteor.publish('Ratings', function publish() {
  if (true) {
    return Ratings.find();
  }
  return this.ready();
});
