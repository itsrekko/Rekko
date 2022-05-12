import {Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import {CdkStack} from '../../cdk-stack';

export const GetAllReviewsLambda = (parent: CdkStack) : Function => {
    return new Function(parent, 'GetAllReviews', {
        runtime: Runtime.NODEJS_14_X,
        handler: 'reviewsIndex.getAllReviews',
        code: Code.fromAsset('src'),
    });
}