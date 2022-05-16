import {Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import { MongoURLSecretManagerPolicy } from '../../policy/mongoSecretManagerPolicy';
import {CdkStack} from '../../cdk-stack';

export const GetReviewsLambda = (parent: CdkStack) : Function => {
    const getReviews = new Function(parent, 'GetReviews', {
        runtime: Runtime.NODEJS_14_X,
        handler: 'reviewsIndex.getReview',
        code: Code.fromAsset('src'),
    });

    getReviews.addToRolePolicy(MongoURLSecretManagerPolicy());
    
    return getReviews;
}