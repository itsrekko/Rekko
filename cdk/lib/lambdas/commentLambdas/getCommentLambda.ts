import {Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import { MongoURLSecretManagerPolicy } from '../../policy/mongoSecretManagerPolicy';
import {CdkStack} from '../../cdk-stack';

export const GetCommentForReviewLambda = (parent: CdkStack) : Function => {
    const getCommentLambda = new Function(parent, 'GetCommentForReview', {
        runtime: Runtime.NODEJS_14_X,
        handler: 'commentIndex.getCommentsForReview',
        code: Code.fromAsset('src'),
    });

    getCommentLambda.addToRolePolicy(MongoURLSecretManagerPolicy());

    return getCommentLambda;
}