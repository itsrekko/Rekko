import { AuthorizationType, LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
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

    const fetchUsers = restAPI.root.addResource('getAllUsers');
    const createUsers = restAPI.root.addResource('checkAndCreateNewUser');

    fetchUsers.addMethod('GET', new LambdaIntegration(healthLambda), {
        operationName: 'getAllUsers',
        authorizationType: AuthorizationType.NONE, // TO DO this would need to change to cognito auth
    });
    
    createUsers.addMethod('POST', new LambdaIntegration(healthLambda), {
        operationName: 'createUsers',
        authorizationType: AuthorizationType.NONE, // TO DO this would need to change to cognito auth
    });
}