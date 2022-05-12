import {Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import {CdkStack} from '../../cdk-stack';

export const AddNewBrandLambda = (parent: CdkStack) : Function => {
    return new Function(parent, 'AddNewBrand', {
        runtime: Runtime.NODEJS_12_X,
        handler: 'brandIndex.addNewBrand',
        code: Code.fromAsset('src'),
    });
}