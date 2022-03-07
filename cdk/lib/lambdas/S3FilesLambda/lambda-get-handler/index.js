const AWS = require('aws-sdk');
const myS3 = new AWS.S3();

exports.handler = async (event) => {
  let requestObject = JSON.parse(event.body);
  const s3Bucket = process.env.s3Bucket;
  
  var params = {
    "Bucket": s3Bucket,
    "Key": requestObject.fileName,
  };
  try{
    const uploadURL =  await myS3.getSignedUrl('getObject', params);
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': "*",
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
      },
      body: uploadURL
    }
  }
  catch (err) {
    return {
      statusCode: 404,
      headers: {
        'Content-Type': 'application/json',
      },
      body: `bad error while uploading the file ${err}`
    }
  }
  
};