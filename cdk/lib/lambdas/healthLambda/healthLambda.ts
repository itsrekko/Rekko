import {Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import {join} from 'path';
import {CdkStack} from '../../cdk-stack';

export const HealthLambda = (parent: CdkStack) => {
    return new Function(parent, 'HealthFunction', {
        runtime: Runtime.NODEJS_12_X,
        handler: 'index.handler',
        code: Code.fromAsset(join(__dirname, 'lambda-handler')),
    });
}