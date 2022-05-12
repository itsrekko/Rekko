import {Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import {CdkStack} from '../../cdk-stack';

export const GetProductLambda = (parent: CdkStack) : Function => {
    return new Function(parent, 'GetProduct', {
        runtime: Runtime.NODEJS_14_X,
        handler: 'productIndex.getProductsByProductName',
        code: Code.fromAsset('src'),
    });
}