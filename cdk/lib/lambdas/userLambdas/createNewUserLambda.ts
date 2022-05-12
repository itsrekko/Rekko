import {Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import {CdkStack} from '../../cdk-stack';

export const CreateNewUserLambda = (parent: CdkStack) : Function => {
    return new Function(parent, 'CreateNewUser', {
        runtime: Runtime.NODEJS_14_X,
        handler: 'userIndex.createNewUser',
        code: Code.fromAsset('src'),
    });
}