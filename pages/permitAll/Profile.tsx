import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Login from './Login';
import Register from './Register';


export default function Profile() {
    const Stack = createNativeStackNavigator();

    return (

        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
            <Stack.Screen name='Register' component={Register} options={{ headerShown: false }} />
        </Stack.Navigator>


    )
}
