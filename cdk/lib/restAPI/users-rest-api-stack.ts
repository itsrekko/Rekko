import { AuthorizationType, LambdaIntegration, Resource, RestApi } from 'aws-cdk-lib/aws-apigateway';
import {CdkStack} from '../cdk-stack';
import { HealthLambda } from '../lambdas/healthLambda/healthLambda';

export const UsersRestAPIStack = (parent: CdkStack) => {
    // deploy the lambdas first
    const healthLambda = HealthLambda(parent);
    const restAPI = new RestApi(parent, 'RekkoUsersRestAPI', 
    {
        description: 'Rest API for Rekko User Info',
    });

    restAPI.root.addMethod('ANY');

    const healthResource: Resource = restAPI.root.addResource('health');
    const productResource: Resource = restAPI.root.addResource('product');
    const reviewResource: Resource = restAPI.root.addResource('review');
    const commentResource: Resource = restAPI.root.addResource('comment');
    const brandResource: Resource = restAPI.root.addResource('brand');
 

    healthResource.addMethod('GET', new LambdaIntegration(healthLambda), {
        operationName: 'status',
        authorizationType: AuthorizationType.NONE, // TO DO this would need to change to cognito auth
    });
}