/**
 * Videosmodel.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    schema: true,
      name: {
        type: 'string'
      },
      age: {
        type: 'integer'
      },
      questions: {
        model: 'questions'
     }
}
}