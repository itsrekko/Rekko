import {CdkStack} from '../cdk-stack';
import { PicturesS3Stack } from '../s3Bucket/pictures-s3-stack';
import { S3FilesGetLambda } from '../lambdas/S3FilesLambda/S3FilesGetLambda';
import { S3FilesPutLambda } from '../lambdas/S3FilesLambda/S3FilesPutLambda';
import { AuthorizationType, Cors, LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';

export const PictureRestStack = async (parent: CdkStack) => {
    const picturesS3Stack = PicturesS3Stack(parent);
    const getObjectLambda = S3FilesGetLambda(parent, picturesS3Stack.bucketName);
    const putObjectLambda = S3FilesPutLambda(parent, picturesS3Stack.bucketName);
    const restAPI = new RestApi(parent, 'RekkoPicturesRestAPI', 
    {
        description: 'Rest API for Rekko Users to upload pictures',
        defaultCorsPreflightOptions: {
            statusCode: 200,
            allowOrigins: Cors.ALL_ORIGINS,
            allowHeaders:  [
                'Content-Type',
                'X-Amz-Date',
                'X-Amz-Security-Token',
                'Authorization',
                'X-Api-Key',
                'X-Requested-With',
                'Accept',
                'Access-Control-Allow-Methods',
                'Access-Control-Allow-Origin',
                'Access-Control-Allow-Headers'
            ],
            allowMethods: ['DELETE','GET','HEAD','OPTIONS','PATCH','POST','PUT']
        }
    });

    restAPI.root.addMethod('ANY');

    const getPictureURL = restAPI.root.addResource('getPictureURL');
    const uploadPictureURL = restAPI.root.addResource('uploadPictureURL');

    getPictureURL.addMethod('POST', new LambdaIntegration(getObjectLambda), {
        operationName: 'getPictureURL',
        authorizationType: AuthorizationType.NONE, // TO DO this would need to change to cognito auth
    });

    uploadPictureURL.addMethod('POST', new LambdaIntegration(putObjectLambda), {
        operationName: 'uploadPictureURL',
        authorizationType: AuthorizationType.NONE, // TO DO this would need to change to cognito auth
    });
    
}