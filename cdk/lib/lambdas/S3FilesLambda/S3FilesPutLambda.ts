import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import {Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import {CdkStack} from '../../cdk-stack';

export const S3FilesPutLambda = (parent: CdkStack, s3BucketName: string) => {
    const putLambda = new Function(parent, `S3FilesPutLambda`, {
        runtime: Runtime.NODEJS_14_X,
        handler: 's3Index.putS3Handler',
        code: Code.fromAsset('src'),
        environment: {
            s3Bucket: s3BucketName
        }
    });

    // access to list, get, put stuff to AWS bucket
    putLambda.addToRolePolicy(new PolicyStatement(
        {
            actions: [
                "s3:Put*"
            ],
            effect: Effect.ALLOW,
            resources: ["*"]
        }
    ));

    return putLambda;
}