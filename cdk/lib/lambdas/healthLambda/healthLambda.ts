import {Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import {join} from 'path';
import {CdkStack} from '../../cdk-stack';

export const HealthLambda = (parent: CdkStack) : Function => {
    return new Function(parent, 'HealthFunction', {
        runtime: Runtime.NODEJS_12_X,
        handler: 'index.healthHandler',
        code: Code.fromAsset('src'),
    });
}