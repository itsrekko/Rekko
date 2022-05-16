import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import {Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import {CdkStack} from '../../cdk-stack';

export const S3FilesGetLambda = (parent: CdkStack, s3BucketName: string) => {
    const getLambda = new Function(parent, `S3FilesGetLambda`, {
        runtime: Runtime.NODEJS_14_X,
        handler: 's3Index.getS3URLHandler',
        code: Code.fromAsset('src'),
        environment: {
            s3Bucket: s3BucketName
        }
    });

    // access to list, get, put stuff to AWS bucket
    getLambda.addToRolePolicy(new PolicyStatement(
        {
            actions: [
                "s3:Get*",
                "s3:List*"
            ],
            effect: Effect.ALLOW,
            resources: ["*"]
        }
    ));

    return getLambda;
}