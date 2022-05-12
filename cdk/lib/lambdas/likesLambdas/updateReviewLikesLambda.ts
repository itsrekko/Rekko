import {Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import {CdkStack} from '../../cdk-stack';

export const UpdateReviewLikesLambda = (parent: CdkStack) : Function => {
    return new Function(parent, 'UpdateReviewLikes', {
        runtime: Runtime.NODEJS_12_X,
        handler: 'likesIndex.updateReviewLikes',
        code: Code.fromAsset('src'),
    });
}