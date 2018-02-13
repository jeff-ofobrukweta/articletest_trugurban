/**
 * Videosmodel.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    schema: true,
    lesson_title: {
        type: 'string'
      },

      lesson_number: {
        type: 'string'
      },
      language2: {
        type: 'string'
      },
      level: {
        type: 'string'
      },
      read_preview: {
        type: 'string'
      },

      video_url: {
        type: 'string'
      },
      
      questions: {
        collection: 'questions',
        via: 'video'
     }
     
}
}