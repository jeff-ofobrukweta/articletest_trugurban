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