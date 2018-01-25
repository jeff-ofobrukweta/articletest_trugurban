/**
 * Upload_contentController
 *
 * @description :: Server-side logic for managing upload_contents
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

/**
 * Copyright 2017, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Demonstrates how to authenticate to Google Cloud Platform APIs using the
 * Google Cloud Client Libraries.
 */

module.exports = {
<<<<<<< HEAD
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
=======
    createbucket() {
      
    // Imports the Google Cloud client library
    const Storage = require('@google-cloud/storage');
    
    // Your Google Cloud Platform project ID
    const projectId = 'trugurbanfiledatabase';
    
    // Creates a client
    const storage = new Storage({
      projectId: projectId,
    });
    
    // The name for the new bucket
    const bucketName = 'my-new-bucket';
    
    // Creates the new bucket
    storage
      .createBucket(bucketName)
      .then(() => {
        console.log(`Bucket ${bucketName} created.`);
      })
      .catch(err => {
        console.error('ERROR:', err);
      });
 },

 listbucket(){
// [START storage_list_buckets]
  // Imports the Google Cloud client library
  const Storage = require('@google-cloud/storage');

  // Creates a client
  const storage = new Storage();

  // Lists all buckets in the current project
  storage
    .getBuckets()
    .then(results => {
      const buckets = results[0];

      console.log('Buckets:');
      buckets.forEach(bucket => {
        console.log(bucket.name);
      });
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
// [END storage_list_buckets]

 },

 deleteBucket(){
// [START storage_delete_bucket]
  // Imports the Google Cloud client library
  const Storage = require('@google-cloud/storage');

  // Creates a client
  const storage = new Storage();
  const bucketName = 'my-new-bucket';
  /**
   * TODO(developer): Uncomment the following line before running the sample.
   */
  // const bucketName = 'Name of a bucket, e.g. my-bucket';

  // Deletes the bucket
  storage
    .bucket(bucketName)
    .delete()
    .then(() => {
      console.log(`Bucket ${bucketName} deleted.`);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
// [END storage_delete_bucket]

 },




upload: function  (req, res) {

    // Call to /upload via GET is error
    if(req.method === 'GET')
          return res.json({'status':'GET not allowed'});                        

    var uploadFile = req.file('uploadFile');
    console.log(uploadFile);

    uploadFile.upload(function onUploadComplete(err, files) {

        // Files will be uploaded to .tmp/uploads

        // IF ERROR Return and send 500 error with error
        if (err) return res.serverError(err);                               

        console.log(files);
        res.json({status:200,file:files});
    });
 }
}
>>>>>>> 5437deda35172ab519f3827a0b23cf157251572a
