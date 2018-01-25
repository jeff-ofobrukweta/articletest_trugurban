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
    //  * (GET /user/avatar/:id)
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
    },
    upload_content(req, res) {
        req.file('avatar').upload((err, uploadedFiles) => {
            if (err) {
                return res.negotiate(err);
            }

            // If no files were uploaded, respond with an error.
            if (uploadedFiles.length === 0) {

                return res.badRequest('No file was uploaded');
            }

            console.log(uploadedFiles.fd);

            const fileDesc = uploadedFiles[0].fd;
            res.json(fileDesc)
            var cloudinary = require('cloudinary');

            cloudinary.config({
                cloud_name: 'troggeurban',
                api_key: '193435699531835',
                api_secret: '5I5ZKM1lZ_qO18mRWjYUGTtAwaw'
            });
            req.file('image').upload(function (err, uploadedFiles) {
                if (err) {
                    return res.send(500, err);
                } else {
                    cloudinary.uploader.upload(fileDesc, function (result) {
                        console.log("hello " + fileDesc)
                        // Images.update(req.param('id'), { imagePath: result.url }, function imageUpdated(err) {
                        //     if (err) {
                        //         console.log(err);
                        //         return res.redirect('/');
                        //     }
                        //     // res.redirect('/image/upload/' + req.param('id'))
                        //     console.log('hopefully uve sent the image')
                        // });
                    });
                }
            });

        });
    },
    upload_video(req, res) {
        req.file('video').upload((err, uploadedFiles) => {
            if (err) {
                return res.negotiate(err);
            }

            // If no files were uploaded, respond with an error.
            if (uploadedFiles.length === 0) {

                return res.badRequest('No file was uploaded');
            }

            console.log(uploadedFiles.fd);

            const fileDesc = uploadedFiles[0].fd;
            res.json(fileDesc)
            var cloudinary = require('cloudinary');

            cloudinary.config({
                cloud_name: 'troggeurban',
                api_key: '193435699531835',
                api_secret: '5I5ZKM1lZ_qO18mRWjYUGTtAwaw'
            });
            req.file('video').upload(function (err, uploadedFiles) {
                if (err) {
                    return res.send(500, err);
                } else {
                    cloudinary.v2.uploader.upload(fileDesc,
                        { resource_type: "video", prefix: 'intermediate/' },
                        function (result) { console.log(result); });
                }
            });

        });
    },
    upload_content(req, res) {
        req.file('avatar').upload((err, uploadedFiles) => {
            if (err) {
                return res.negotiate(err);
            }

            // If no files were uploaded, respond with an error.
            if (uploadedFiles.length === 0) {

                return res.badRequest('No file was uploaded');
            }

            console.log(uploadedFiles.fd);

            const fileDesc = uploadedFiles[0].fd;
            res.json(fileDesc)
            var cloudinary = require('cloudinary');

            cloudinary.config({
                cloud_name: 'troggeurban',
                api_key: '193435699531835',
                api_secret: '5I5ZKM1lZ_qO18mRWjYUGTtAwaw'
            });
            req.file('image').upload(function (err, uploadedFiles) {
                if (err) {
                    return res.send(500, err);
                } else {
                    cloudinary.uploader.upload(fileDesc, function (result) {
                        console.log("hello " + fileDesc)
                        // Images.update(req.param('id'), { imagePath: result.url }, function imageUpdated(err) {
                        //     if (err) {
                        //         console.log(err);
                        //         return res.redirect('/');
                        //     }
                        //     // res.redirect('/image/upload/' + req.param('id'))
                        //     console.log('hopefully uve sent the image')
                        // });
                    });
                }
            });

        });
    },
    showallvideos(){
        const cloudinary = require('cloudinary');
        cloudinary.config({
            cloud_name: 'troggeurban',
            api_key: '193435699531835',
            api_secret: '5I5ZKM1lZ_qO18mRWjYUGTtAwaw'
        });
        //the video gotten from the enlisted url is only a link for download
        cloudinary.api.resources(function (result) { console.log(JSON.stringify(result,null,2)) }, { type: 'upload', resource_type: 'video', prefix: 'biginners_class/' });
        
        //this is a sample of the url for video playing
        //https://res.cloudinary.com/troggeurban/video/upload/biginners_class/Kehlani_-_Gangsta_From_Suicide_Squad-_The_Album_Official_Video.mp4
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