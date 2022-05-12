import {Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import {CdkStack} from '../../cdk-stack';

export const GetReviewsLambda = (parent: CdkStack) : Function => {
    return new Function(parent, 'GetReviews', {
        runtime: Runtime.NODEJS_12_X,
        handler: 'reviewsIndex.getReview',
        code: Code.fromAsset('src'),
    });
}