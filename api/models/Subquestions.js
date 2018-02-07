/**
 * Subquestions.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    // ithis is the relationship with mdel question
    subquestiondata: {
      type: 'string'
    },
    subquest: {
      model: 'questions'
    },
    // 
    exercises: {
      collection: 'exercises',
      via: 'exeworks'
   }
  }
};

