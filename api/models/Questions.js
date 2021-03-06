/**
 * Questions.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

attributes: {
  schema: true,
   data: {
      type: 'string'
    },
    video: {
      model: 'videosmodel'
    },
    questions: {
      type: 'string'
    },
    answer: {
        type: 'string'
      },
      subquestionsflow: {
        type: 'string'
      },
    subquestions: {
      collection: 'subquestions',
      via: 'subquest'
   }
  }
};

