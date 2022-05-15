import {Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import { MongoURLSecretManagerPolicy } from '../../policy/mongoSecretManagerPolicy';
import {CdkStack} from '../../cdk-stack';

export const UpdateReviewLikesLambda = (parent: CdkStack) : Function => {
    const updateReviewLikesLambda = new Function(parent, 'UpdateReviewLikes', {
        runtime: Runtime.NODEJS_14_X,
        handler: 'likesIndex.updateReviewLikes',
        code: Code.fromAsset('src'),
    });

    updateReviewLikesLambda.addToRolePolicy(MongoURLSecretManagerPolicy());
    return updateReviewLikesLambda;
}