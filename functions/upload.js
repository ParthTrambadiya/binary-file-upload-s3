'use strict'

const AWS = require('aws-sdk')
const s3 = new AWS.S3()

const responseSucceeded = {
    statusCode: 200,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({})
};

module.exports.handler = function(event, context, callback) {
    console.log('Event ', event);
    const randomID = parseInt(Math.random() * 10000000)
    const Key = `${randomID}.mp4`
  
    const s3Params = {
        Bucket: 'your-bucket-name',
        Key,
        Expires: 300,
        ContentType: 'content-type',
    }
  
    console.log('Params: ', s3Params)
    const uploadURL = s3.getSignedUrl('putObject', s3Params)
  
    console.log(uploadURL)
    responseSucceeded.body = JSON.stringify(uploadURL)
    callback(null, responseSucceeded);
}