import {Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import {CdkStack} from '../../cdk-stack';

export const GetAllProductsLambda = (parent: CdkStack) : Function => {
    return new Function(parent, 'GetAllProducts', {
        runtime: Runtime.NODEJS_12_X,
        handler: 'productIndex.getAllProducts',
        code: Code.fromAsset('src'),
    });
}