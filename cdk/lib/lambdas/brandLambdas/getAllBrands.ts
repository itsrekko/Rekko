import {Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import { MongoURLSecretManagerPolicy } from '../../policy/mongoSecretManagerPolicy';
import {CdkStack} from '../../cdk-stack';

export const GetAllBrandsLambda = (parent: CdkStack) : Function => {
    const getBrandsLambda = new Function(parent, 'GetAllBrands', {
        runtime: Runtime.NODEJS_14_X,
        handler: 'brandIndex.getAllBrands',
        code: Code.fromAsset('src'),
    });

    getBrandsLambda.addToRolePolicy(MongoURLSecretManagerPolicy());

    return getBrandsLambda;
}