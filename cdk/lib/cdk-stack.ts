import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CognitoStack } from './authentication/cognito-stack';
import { PictureRestStack } from './restAPI/pictures-rest-api-stack';
import { RestAPIStack } from './restAPI/rekko-rest-api-stack';
export class CdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    RestAPIStack(this);
    PictureRestStack(this);
    CognitoStack(this);
  }
}