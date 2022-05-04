import { RemovalPolicy } from 'aws-cdk-lib';
import { AccountRecovery, OAuthScope, UserPool, UserPoolClientIdentityProvider } from 'aws-cdk-lib/aws-cognito';
import { CdkStack } from '../cdk-stack';

export const CognitoStack = (parent: CdkStack) => {
    // User pool
    const userPool: UserPool = new UserPool(parent, 'RekkoCognitoUserpool', {
        userPoolName: 'RekkoCognitoUserpool',
        selfSignUpEnabled: true,
        signInAliases: {
            email: true,
        },
        autoVerify: {
            email: true
        },
        standardAttributes: {
            givenName: {
                required: false,
                mutable: true,
            },
            familyName: {
                required: false,
                mutable: true
            }
        },
        passwordPolicy: {
            minLength: 6,
            requireDigits: true,
            requireLowercase: true,
            requireUppercase: true,
            requireSymbols: false
        },
        accountRecovery: AccountRecovery.EMAIL_ONLY,
        removalPolicy: RemovalPolicy.RETAIN
    });
    
    userPool.addClient('RekkoCognitoUserpool-client', {
        userPoolClientName: 'RekkoCognitoUserpool-client',
        oAuth: {
            flows: { authorizationCodeGrant: true },
            scopes: [OAuthScope.OPENID],
            callbackUrls: ['https://www.rekko.co/', 'http://localhost:3000/']
        },
        supportedIdentityProviders: [
            UserPoolClientIdentityProvider.COGNITO,
        ]
    });

    userPool.addDomain('RekkoCognitoUserpool-domain', {
        cognitoDomain: {
            domainPrefix: 'rekko'
        }
    });

    return userPool;
}