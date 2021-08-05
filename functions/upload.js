'use strict'

const AWS = require('aws-sdk')
AWS.config.update({ region: process.env.AWS_REGION })
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
        Bucket: 'Bucket-Name',
        Key,
        Expires: 300,
        ContentType: 'Content-Type'
    }
  
    console.log('Params: ', s3Params)
    const uploadURL = s3.getSignedUrl('putObject', s3Params)
  
    console.log(uploadURL)
    responseSucceeded.body = JSON.stringify(uploadURL)
    callback(null, responseSucceeded);
}