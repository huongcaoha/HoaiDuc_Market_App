import App from '@/pages/permitAll/App';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

export default function TabLayout() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName='App'>
      <Stack.Screen name='App' component={App} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}