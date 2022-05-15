import {Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import { MongoURLSecretManagerPolicy } from '../../policy/mongoSecretManagerPolicy';
import {CdkStack} from '../../cdk-stack';

export const GetAllReviewsLambda = (parent: CdkStack) : Function => {
    const getAllReviewsLambda = new Function(parent, 'GetAllReviews', {
        runtime: Runtime.NODEJS_14_X,
        handler: 'reviewsIndex.getAllReviews',
        code: Code.fromAsset('src'),
    });

    getAllReviewsLambda.addToRolePolicy(MongoURLSecretManagerPolicy());
    return getAllReviewsLambda;
}