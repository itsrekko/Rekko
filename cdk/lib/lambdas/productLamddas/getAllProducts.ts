import {Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import { MongoURLSecretManagerPolicy } from '../../policy/mongoSecretManagerPolicy';
import {CdkStack} from '../../cdk-stack';

export const GetAllProductsLambda = (parent: CdkStack) : Function => {
    const getAllProductsLambda = new Function(parent, 'GetAllProducts', {
        runtime: Runtime.NODEJS_14_X,
        handler: 'productIndex.getAllProducts',
        code: Code.fromAsset('src'),
    });

    getAllProductsLambda.addToRolePolicy(MongoURLSecretManagerPolicy());

    return getAllProductsLambda;
}