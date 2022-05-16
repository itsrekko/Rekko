import {Amplify} from 'aws-amplify';

export const InitializeAmplify = () => {
    Amplify.configure({
        Auth: {
            userPoolId: 'us-west-2_Tn6os3jKt',
            region: 'us-west-2',
            userPoolWebClientId: '59b50k0ciht6irdh4ub4ki31lu',
            mandatorySignIn: true,
            oauth: {
                domain: 'rekko.auth.us-west-2.amazoncognito.com',
                scope: ['openid'],
                redirectSignIn: 'http://localhost:3000/',
                redirectSignOut: 'http://localhost:3000/',
                responseType: 'code'
            }
        }
    });
}