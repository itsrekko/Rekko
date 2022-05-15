import {Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import { MongoURLSecretManagerPolicy } from '../../policy/mongoSecretManagerPolicy';
import {CdkStack} from '../../cdk-stack';

export const GetAllUsersLambda = (parent: CdkStack) : Function => {
    const getAllUsersLambda = new Function(parent, 'GetAllUsers', {
        runtime: Runtime.NODEJS_14_X,
        handler: 'userIndex.getAllUsers',
        code: Code.fromAsset('src'),
    });

    getAllUsersLambda.addToRolePolicy(MongoURLSecretManagerPolicy());
    return getAllUsersLambda;
}