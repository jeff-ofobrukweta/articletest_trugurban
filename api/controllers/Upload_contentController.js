/**
 * Upload_contentController
 *
 * @description :: Server-side logic for managing upload_contents
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    uploadAvatar: function (req, res) {

        req.file('avatar').upload({
            // don't allow the total upload size to exceed ~10MB
            maxBytes: 10000000
        }, function whenDone(err, uploadedFiles) {
            if (err) {
                return res.negotiate(err);
            }

            // If no files were uploaded, respond with an error.
            if (uploadedFiles.length === 0) {
                return res.badRequest('No file was uploaded');
            }


            // Save the "fd" and the url where the avatar for a user can be accessed
            User.update(req.session.id, {

                // Generate a unique URL where the avatar can be downloaded.
                avatarUrl: require('util').format('%s/user/avatar/%s', sails.getBaseUrl(), req.session.id),

                // Grab the first file and use it's `fd` (file descriptor)
                avatarFd: uploadedFiles[0].fd
            })
                .exec(function (err) {
                    if (err) return res.negotiate(err);
                    return res.ok();
                });
        });
    },


    /**
     * Download avatar of the user with the specified id
     *
     * (GET /user/avatar/:id)
     */
    avatar: function (req, res) {

        req.validate({
            id: 'string'
        });

        User.findOne(req.param('id')).exec(function (err, user) {
            if (err) return res.negotiate(err);
            if (!user) return res.notFound();

            // User has no avatar image uploaded.
            // (should have never have hit this endpoint and used the default image)
            if (!user.avatarFd) {
                return res.notFound();
            }

            var SkipperDisk = require('skipper-disk');
            var fileAdapter = SkipperDisk(/* optional opts */);

            // set the filename to the same file as the user uploaded
            res.set("Content-disposition", "attachment; filename='" + file.name + "'");

            // Stream the file down
            fileAdapter.read(user.avatarFd)
                .on('error', function (err) {
                    return res.serverError(err);
                })
                .pipe(res);
        });
    }

};

// uploadFile: function (req, res) {
//     req.file('avatar').upload({
//         adapter: require('skipper-gridfs'),
//         uri: 'mongodb://[username:password@]host1[:port1][/[database[.bucket]]'
//     }, function (err, filesUploaded) {
//         if (err) return res.negotiate(err);
//         return res.ok();
//     });
// }
