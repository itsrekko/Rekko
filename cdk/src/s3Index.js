const AWS = require('aws-sdk');
const myS3 = new AWS.S3();

exports.putS3Handler = async (event, context) => {
    let requestObject = JSON.parse(event.body);
    const s3Bucket = process.env.s3Bucket;
    
    const params = {
        Bucket: s3Bucket,
        Fields: {
          key: requestObject.fileName
        },
        Conditions: [
          ["starts-with", "$Content-Type", ""],
          ['content-length-range', 0, 10000000] // 10 Mb
        ]
      }
    try{
      const uploadURL =  await myS3.createPresignedPost(params);
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': "*",
          'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
        },
        body: JSON.stringify(uploadURL)
      }
    }
    catch (err) {
      return {
        statusCode: 404,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': "*",
          'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
        },
        body: `bad error while uploading the file ${err}`
      }
    }
    
};

exports.getS3URLHandler = async (event, context) => {
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
          'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, Accept'
        },
        body: uploadURL
      }
    }
    catch (err) {
      return {
        statusCode: 404,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': "*",
          'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, Accept'
        },
        body: `bad error while uploading the file ${err}`
      }
    }   
};