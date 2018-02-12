/**
 * Created by @cpmproto
 */
module.exports = {
    sails_url: function () {
        return sails.getBaseURL() + sails.config.blueprints.prefix
    },
    log: {
        level: 'error'
    },
    models: {
        connection: 'someMongodbServer',
        migrate: 'drop'
    }
};