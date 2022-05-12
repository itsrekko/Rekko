import {Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import {CdkStack} from '../../cdk-stack';

export const IndexLambda = (parent: CdkStack) : Function => {
    return new Function(parent, 'IndexFunction', {
        runtime: Runtime.NODEJS_12_X,
        handler: 'index.indexHandler',
        code: Code.fromAsset('src'),
    });
}