import {Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import { MongoURLSecretManagerPolicy } from '../../policy/mongoSecretManagerPolicy';
import {CdkStack} from '../../cdk-stack';

export const GetProductLambda = (parent: CdkStack) : Function => {
    const getProductLambda = new Function(parent, 'GetProduct', {
        runtime: Runtime.NODEJS_14_X,
        handler: 'productIndex.getProductsByProductName',
        code: Code.fromAsset('src'),
    });

    getProductLambda.addToRolePolicy(MongoURLSecretManagerPolicy());

    return getProductLambda;
}