import {Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import {CdkStack} from '../../cdk-stack';

export const AddNewProductReviewLambda = (parent: CdkStack) : Function => {
    return new Function(parent, 'AddNewProductReview', {
        runtime: Runtime.NODEJS_14_X,
        handler: 'productIndex.addNewProductReview',
        code: Code.fromAsset('src'),
    });
}