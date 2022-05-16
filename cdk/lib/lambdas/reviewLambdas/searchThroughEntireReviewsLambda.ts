import {Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import { MongoURLSecretManagerPolicy } from '../../policy/mongoSecretManagerPolicy';
import {CdkStack} from '../../cdk-stack';

export const SearchThroughEntireReviewLambda = (parent: CdkStack) : Function => {
    const searchLambda = new Function(parent, 'SearchThroughEntireReview', {
        runtime: Runtime.NODEJS_14_X,
        handler: 'reviewsIndex.searchThroughEntireReview',
        code: Code.fromAsset('src'),
    });

    searchLambda.addToRolePolicy(MongoURLSecretManagerPolicy());
    return searchLambda;
}