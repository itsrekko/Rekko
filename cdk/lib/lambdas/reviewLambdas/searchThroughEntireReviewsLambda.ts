import {Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import {CdkStack} from '../../cdk-stack';

export const SearchThroughEntireReviewLambda = (parent: CdkStack) : Function => {
    return new Function(parent, 'SearchThroughEntireReview', {
        runtime: Runtime.NODEJS_12_X,
        handler: 'reviewsIndex.searchThroughEntireReview',
        code: Code.fromAsset('src'),
    });
}