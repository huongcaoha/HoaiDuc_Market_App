import baseUrl from '@/apis/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import Icon from 'react-native-vector-icons/FontAwesome';

const Login = ({ navigation }: { navigation: any }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const response = await baseUrl.post('/auth/login', {
            email,
            password,
        });

        if (response.data.data) {
            await AsyncStorage.setItem('accessToken', JSON.stringify(response.data.data.accessToken));
            await AsyncStorage.setItem('refreshToken', JSON.stringify(response.data.data.refreshToken));
            await AsyncStorage.setItem('fullName', JSON.stringify(response.data.data.fullName));
            await AsyncStorage.setItem('role', JSON.stringify(response.data.data.role));
            await AsyncStorage.setItem('uuid', JSON.stringify(response.data.data.uuid));
            if (response.data.data.role === "ADMIN") {
                navigation.navigate("Admin");
            } else {
                navigation.navigate("App");
            }
        } else {
            Alert.alert('Lỗi', 'Email hoặc mật khẩu không đúng!');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}>
                <View style={styles.innerContainer}>
                    <Image
                        source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
                        style={styles.logo}
                    />
                    <Text style={styles.title}>Đăng nhập</Text>
                    <Text style={styles.subtitle}>Rất vui được gặp lại bạn!</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Nhập email của bạn"
                        placeholderTextColor="#888"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Nhập mật khẩu"
                        placeholderTextColor="#888"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                    />

                    <TouchableOpacity>
                        <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>ĐĂNG NHẬP</Text>
                    </TouchableOpacity>

                    <View style={styles.dividerContainer}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.dividerText}>HOẶC</Text>
                        <View style={styles.dividerLine} />
                    </View>

                    <View style={styles.socialLoginContainer}>
                        <TouchableOpacity style={styles.socialButton}>
                            {/* <Icon name="google" size={20} color="#DB4437" /> */}
                            <Text style={[styles.socialButtonText, { color: '#DB4437' }]}>
                                Google
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialButton}>
                            {/* <Icon name="facebook" size={20} color="#4267B2" /> */}
                            <Text style={[styles.socialButtonText, { color: '#4267B2' }]}>
                                Facebook
                            </Text>
                        </TouchableOpacity>
                    </View>


                    <View style={styles.registerContainer}>
                        <Text style={styles.registerText}>Chưa có tài khoản? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                            <Text style={styles.registerLink}>Đăng ký ngay</Text>
                        </TouchableOpacity>
                    </View>


                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

// Bảng màu giữ nguyên, chỉ thêm style cho phần mới
const styles = StyleSheet.create({
    // ... (tất cả các style cũ giữ nguyên)
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    keyboardView: {
        flex: 1,
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
    logo: {
        width: 80,
        height: 80,
        alignSelf: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#333',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 40,
    },
    input: {
        height: 50,
        backgroundColor: '#F7F7F7',
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        color: '#333',
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#E8E8E8',
    },
    forgotPassword: {
        textAlign: 'right',
        color: '#007BFF',
        fontWeight: '600',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#FF6347',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 30,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#E8E8E8',
    },
    dividerText: {
        width: 50,
        textAlign: 'center',
        color: '#888',
        fontWeight: '600',
    },
    socialLoginContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    socialButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E8E8E8',
        marginHorizontal: 5,
    },
    socialButtonText: {
        marginLeft: 10,
        fontWeight: '600',
        fontSize: 16,
    },
    // THÊM STYLE MỚI TẠI ĐÂY
    registerContainer: {
        flexDirection: 'row', // Xếp chữ hàng ngang
        marginTop: 30, // Khoảng cách với phần tử bên trên
        justifyContent: 'center', // Căn giữa
    },
    registerText: {
        color: '#666',
        fontSize: 14,
    },
    registerLink: {
        color: '#FF6347', // Màu cam chủ đạo cho nổi bật
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default Login;