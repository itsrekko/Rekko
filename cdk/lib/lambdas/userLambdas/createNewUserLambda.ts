import {Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import { MongoURLSecretManagerPolicy } from '../../policy/mongoSecretManagerPolicy';
import {CdkStack} from '../../cdk-stack';

export const CreateNewUserLambda = (parent: CdkStack) : Function => {
    const createNewUserLambda = new Function(parent, 'CreateNewUser', {
        runtime: Runtime.NODEJS_14_X,
        handler: 'userIndex.createNewUser',
        code: Code.fromAsset('src'),
    });

    createNewUserLambda.addToRolePolicy(MongoURLSecretManagerPolicy());
    return createNewUserLambda;
}