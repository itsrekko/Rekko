import {Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import {MongoURLSecretManagerPolicy} from '../../policy/mongoSecretManagerPolicy';
import {CdkStack} from '../../cdk-stack';

export const AddNewBrandLambda = (parent: CdkStack) : Function => {
    const newBrandLambda = new Function(parent, 'AddNewBrand', {
        runtime: Runtime.NODEJS_14_X,
        handler: 'brandIndex.addNewBrand',
        code: Code.fromAsset('src'),
    });

    newBrandLambda.addToRolePolicy(MongoURLSecretManagerPolicy());
    return newBrandLambda;
}