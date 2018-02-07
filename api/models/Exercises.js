/**
 * Exercises.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    // this is the relationship with subquestion
    exercise: {
      type: 'string'
    },
    exeworks: {
      model: 'subquestions'
    },
  }
};

