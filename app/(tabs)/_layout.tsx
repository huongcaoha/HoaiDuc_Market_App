import Admin from '@/pages/admin/Admin';
import App from '@/pages/permitAll/App';
import Home from '@/pages/permitAll/Home';
import LiveAndVideo from '@/pages/permitAll/LiveAndVideo';
import Login from '@/pages/permitAll/Login';
import Login2 from '@/pages/permitAll/Login2';
import Mall from '@/pages/permitAll/Mall';
import Notification from '@/pages/permitAll/Notification';
import Profile from '@/pages/permitAll/Profile';
import Register from '@/pages/permitAll/Register';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

export default function TabLayout() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName='App'>
      <Stack.Screen name='App' component={App} options={{ headerShown: false }} />
      <Stack.Screen name='Admin' component={Admin} options={{ headerShown: false }} />
      <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
      <Stack.Screen name='Register' component={Register} options={{ headerShown: false }} />
      <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
      <Stack.Screen name='LiveAndVideo' component={LiveAndVideo} options={{ headerShown: false }} />
      <Stack.Screen name='Mall' component={Mall} options={{ headerShown: false }} />
      <Stack.Screen name='Notification' component={Notification} options={{ headerShown: false }} />
      <Stack.Screen name='Profile' component={Profile} options={{ headerShown: false }} />
      <Stack.Screen name="Login2" component={Login2} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}