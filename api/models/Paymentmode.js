/**
 * Paymentmode.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    transactionRefrence: {
      type: 'string',
      required: true
    },
    Language: {
      type: 'string',
      required: true
    },
    Level: {
      type: 'string',
      required: true
    },
    payment: {
      model: 'User'
    },
  }
};

