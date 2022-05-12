import {Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import {CdkStack} from '../../cdk-stack';

export const GetCommentForReviewLambda = (parent: CdkStack) : Function => {
    return new Function(parent, 'GetCommentForReview', {
        runtime: Runtime.NODEJS_14_X,
        handler: 'commentIndex.getCommentsForReview',
        code: Code.fromAsset('src'),
    });
}