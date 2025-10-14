import Home from '@/pages/permitAll/Home';
import LiveAndVideo from '@/pages/permitAll/LiveAndVideo';
import Mall from '@/pages/permitAll/Mall';
import Notification from '@/pages/permitAll/Notification';
import Profile from '@/pages/permitAll/Profile';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';




export default function App() {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === "Home") {
                        iconName = "home";
                    } else if (route.name === "Mall") {
                        iconName = "bag";
                    } else if (route.name === "Live&Video") {
                        iconName = "camera";
                    } else if (route.name === "Profile") {
                        iconName = "person";
                    } else if (route.name === "Notification") {
                        iconName = "notifications";
                    }

                    return <Ionicons name={iconName} size={size} color={color} />
                }

            })}
        >
            <Tab.Screen name='Home' component={Home} options={{ headerShown: false }} />
            <Tab.Screen name='Mall' component={Mall} options={{ headerShown: false }} />
            <Tab.Screen name='Live&Video' component={LiveAndVideo} options={{ headerShown: false }} />
            <Tab.Screen name='Notification' component={Notification} options={{ headerShown: false }} />
            <Tab.Screen name='Profile' component={Profile} options={{ headerShown: false }} />
        </Tab.Navigator>
    )
}
