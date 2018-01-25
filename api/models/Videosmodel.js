/**
 * Videosmodel.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    schema: true,
    attributes: {
      language: {
        type: 'string',
        required: true
      },
      level: {
        type: 'string',
        required: true
      },
      category: {
        type: 'string',
        required: true,
        minLength: 11,
      },
      lesson: {
        type: 'string',
        required: true,
        unique: true
      },
      video_url: {
        type: 'string',
        required: true,
        minLength: 6,
        unique: true
      },
      answers: {
        type: 'array',
        required: true,
        defaultsTo: false
      },
      questions: {
        firstname: 'string',
        lastname: 'string',
        photo: 'string',
        birthdate: 'date',
        zipcode: 'integer'
      },
      excercises: {
        type: 'array',
        required: false
      }, 
      lessons: {
        type: 'array',
        required: true
      }
  }
}
}