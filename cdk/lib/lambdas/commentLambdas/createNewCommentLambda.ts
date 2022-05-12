import {Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import {CdkStack} from '../../cdk-stack';

export const CreateNewCommentLambda = (parent: CdkStack) : Function => {
    return new Function(parent, 'CreateNewComment', {
        runtime: Runtime.NODEJS_12_X,
        handler: 'commentIndex.createNewComment',
        code: Code.fromAsset('src'),
    });
}