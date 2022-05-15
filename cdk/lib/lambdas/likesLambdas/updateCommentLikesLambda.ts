import {Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import { MongoURLSecretManagerPolicy } from '../../policy/mongoSecretManagerPolicy';
import {CdkStack} from '../../cdk-stack';

export const UpdateCommentLikesLambda = (parent: CdkStack) : Function => {
    const updateCommentLikesLambda = new Function(parent, 'UpdateCommentLikes', {
        runtime: Runtime.NODEJS_14_X,
        handler: 'likesIndex.updateCommentLikes',
        code: Code.fromAsset('src'),
    });

    updateCommentLikesLambda.addToRolePolicy(MongoURLSecretManagerPolicy());
    return updateCommentLikesLambda;
}