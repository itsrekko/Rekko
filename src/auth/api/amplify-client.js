import {Amplify} from 'aws-amplify';

export const InitializeAmplify = () => {
    Amplify.configure({
        Auth: {
            userPoolId: 'us-west-2_B2J1wdc9b',
            region: 'us-west-2',
            userPoolWebClientId: '19n1fmf4duutam982b1ibc1d73',
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