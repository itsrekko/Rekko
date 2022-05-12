import {Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import {CdkStack} from '../../cdk-stack';

export const UpdateCommentLikesLambda = (parent: CdkStack) : Function => {
    return new Function(parent, 'UpdateCommentLikes', {
        runtime: Runtime.NODEJS_14_X,
        handler: 'likesIndex.updateCommentLikes',
        code: Code.fromAsset('src'),
    });
}