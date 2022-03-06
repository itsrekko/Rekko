const AWS = require('aws-sdk');
const myS3 = new AWS.S3();

exports.handler = async (event) => {
  let requestObject = JSON.parse(event.body);
  const s3Bucket = process.env.s3Bucket;
  const s3Action = process.env.s3Action; // putObject || getObject
  
  var params = {
    "Bucket": s3Bucket,
    "Key": requestObject.fileName,
  };
  if (s3Action === 'putObject'){
    params["ContentType"] = requestObject.fileType;
  }
  try{
    const uploadURL =  await myS3.getSignedUrl(s3Action, params);
    return {
      statusCode: 200,
      body: uploadURL
    }
  }
  catch (err) {
    return {
      statusCode: 404,
      body: `bad error while uploading the file ${err}`
    }
  }
  
};