import * as AuthSession from 'expo-auth-session';
import React from 'react';
import { Button } from 'react-native';

const discovery = {
    authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenEndpoint: 'https://oauth2.googleapis.com/token',
};

export default function Login2() {
    const [request, response, promptAsync] = AuthSession.useAuthRequest(
        {
            clientId: '146681352133-61lacepudts5f3f7celip0vm7p1qv3ea.apps.googleusercontent.com',

            scopes: ['openid', 'profile', 'email'],
            redirectUri: "https://auth.expo.io/@huongcaoha1994/HoaiDuc_Market_App", // Thêm redirectUri
        },
        discovery
    );

    React.useEffect(() => {
        if (response?.type === 'success') {
            const { code } = response.params;
            // Xử lý xác thực với mã code
        }
    }, [response]);

    return (
        <Button
            title="Login with Google"
            disabled={!request}
            onPress={() => {
                promptAsync();
            }}
        />
    );
}