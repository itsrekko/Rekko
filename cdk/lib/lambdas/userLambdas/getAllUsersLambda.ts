import {Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import {CdkStack} from '../../cdk-stack';

export const GetAllUsersLambda = (parent: CdkStack) : Function => {
    return new Function(parent, 'GetAllUsers', {
        runtime: Runtime.NODEJS_14_X,
        handler: 'userIndex.getAllUsers',
        code: Code.fromAsset('src'),
    });
}