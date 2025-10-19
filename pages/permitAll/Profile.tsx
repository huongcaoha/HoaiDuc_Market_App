import baseUrl from '@/apis/baseUrl';
import { checkLogin } from '@/utils/Common';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Login2 from './Login2';


export default function Profile({ navigation }: { navigation: any }) {

    const [fullName, setFullName] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);


    useEffect(() => {
        const getFullName = async () => {
            const name = await checkLogin(navigation);
            if (name) {
                setFullName(name);
            }
        };
        getFullName();
    }, [navigation])

    const handleLogout = async () => {
        try {
            const response = await baseUrl.patch('/auth/logout');
            if (response.data.status === 200) {
                await AsyncStorage.removeItem('accessToken');
                await AsyncStorage.removeItem('refreshToken');
                await AsyncStorage.removeItem('fullName');
                await AsyncStorage.removeItem('role');
                await AsyncStorage.removeItem('uuid');
                Alert.alert("Thông báo", "Đăng xuất thành công");
                navigation.navigate("Login");
            } else {
                Alert.alert("Thông báo", "Đăng xuất thất bại");
            }

        } catch (error) {
            Alert.alert("Lỗi", error.message);
        }
    }
    return (

        <SafeAreaView>
            {/* <View>
                <Text>Xin chào : {fullName}</Text>
                <Button title="Đăng xuất" onPress={handleLogout} />
            </View>

            {
                isLoading && <ActivityIndicator size="large" color="green" />
            } */}
            <Login2 />

        </SafeAreaView>


    )
}
