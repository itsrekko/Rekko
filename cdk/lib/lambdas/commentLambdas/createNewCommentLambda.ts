import {Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import { MongoURLSecretManagerPolicy } from '../../policy/mongoSecretManagerPolicy';
import {CdkStack} from '../../cdk-stack';

export const CreateNewCommentLambda = (parent: CdkStack) : Function => {
    const createNewCommentLambda = new Function(parent, 'CreateNewComment', {
        runtime: Runtime.NODEJS_14_X,
        handler: 'commentIndex.createNewComment',
        code: Code.fromAsset('src'),
    });

    createNewCommentLambda.addToRolePolicy(MongoURLSecretManagerPolicy());
    return createNewCommentLambda;
}