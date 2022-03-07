import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import {Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import {join} from 'path';
import {CdkStack} from '../../cdk-stack';

export const S3FilesGetLambda = (parent: CdkStack, s3BucketName: string) => {
    const putLambda = new Function(parent, `S3FilesGetLambda`, {
        runtime: Runtime.NODEJS_12_X,
        handler: 'index.handler',
        code: Code.fromAsset(join(__dirname, 'lambda-get-handler')),
        environment: {
            s3Bucket: s3BucketName
        }
    });

    // access to list, get, put stuff to AWS bucket
    putLambda.addToRolePolicy(new PolicyStatement(
        {
            actions: [
                "s3:Get*",
                "s3:List*",
                "s3:Put*"
            ],
            effect: Effect.ALLOW,
            resources: ["*"]
        }
    ));

    return putLambda;
}