import {Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import {CdkStack} from '../../cdk-stack';

export const GetAllBrandsLambda = (parent: CdkStack) : Function => {
    return new Function(parent, 'GetAllBrands', {
        runtime: Runtime.NODEJS_12_X,
        handler: 'brandIndex.getAllBrands',
        code: Code.fromAsset('src'),
    });
}