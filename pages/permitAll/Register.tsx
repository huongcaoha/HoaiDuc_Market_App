import baseUrl from '@/apis/baseUrl';
import useDebounce from '@/hooks/useDebounce';
import { UserRegister } from '@/types/type';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const Register = ({ navigation }: { navigation: any }) => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setIsLoading(true);
                const response = await baseUrl.get("/users");
                console.log(JSON.stringify(response.data));

                // setUsers(response.data);

            } catch (error) {
                alert(error)
            } finally {
                setIsLoading(false);
            }
        }
        fetchUsers();
    }, [])
    const [userRegister, setUserRegister] = useState<UserRegister>({
        fullName: '',
        email: '',
        phone: '',
        password: '',
    });


    const [userRegisterError, setUserRegisterError] = useState<UserRegister>({
        fullName: '',
        email: '',
        phone: '',
        password: '',
    });
    const [agreedToTerms, setAgreedToTerms] = useState(false); // State cho checkbox

    const [debouncedUserRegister, setDebouncedUserRegister] = useState<UserRegister>(userRegister);

    // Sử dụng useDebounce cho toàn bộ userRegister
    const debouncedFullName = useDebounce(userRegister.fullName, 200);
    const debouncedEmail = useDebounce(userRegister.email, 200);
    const debouncedPhone = useDebounce(userRegister.phone, 200);
    const debouncedPassword = useDebounce(userRegister.password, 200);

    // Theo dõi sự thay đổi và cập nhật giá trị đã debounce
    useEffect(() => {
        setDebouncedUserRegister({
            fullName: debouncedFullName,
            email: debouncedEmail,
            phone: debouncedPhone,
            password: debouncedPassword,
        });
    }, [debouncedFullName, debouncedEmail, debouncedPhone, debouncedPassword]);

    const handlerChangeInput = (field: keyof UserRegister, value: string) => {
        setUserRegister({
            ...userRegister,
            [field]: value,
        });
    };

    const checkValidateData = () => {
        let isValid = true;

        const patternEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const patternPhone = /^0[35789][0-9]{8}$/;

        if (debouncedFullName === "") {
            isValid = false;
            setUserRegisterError((pre) => {
                return {
                    ...pre,
                    fullName: "Họ và Tên không được để trống"
                }
            });
        } else {
            setUserRegisterError((pre) => {
                return {
                    ...pre,
                    fullName: ""
                }
            });
        }

        if (debouncedEmail === "") {
            isValid = false;
            setUserRegisterError((pre) => {
                return {
                    ...pre,
                    email: "Email không được để trống"
                }
            });
        } else {
            setUserRegisterError((pre) => {
                return {
                    ...pre,
                    email: ""
                }
            });
        }

        if (patternEmail.test(debouncedEmail) === false) {
            isValid = false;
            setUserRegisterError((pre) => {
                return {
                    ...pre,
                    email: "Email không hợp lệ"
                }
            });
        } else {
            setUserRegisterError((pre) => {
                return {
                    ...pre,
                    email: ""
                }
            });
        }

        if (debouncedPassword === "") {
            isValid = false;
            setUserRegisterError((pre) => {
                return {
                    ...pre,
                    password: "Mật khẩu không được để trống"
                }
            });
        } else {
            setUserRegisterError((pre) => {
                return {
                    ...pre,
                    password: ""
                }
            });
        }

        if (debouncedPhone === "") {
            isValid = false;
            setUserRegisterError((pre) => {
                return {
                    ...pre,
                    phone: "Số điện thoại không được để trống"
                }
            });
        } else {
            setUserRegisterError((pre) => {
                return {
                    ...pre,
                    phone: ""
                }
            });
        }

        if (patternPhone.test(debouncedPhone) === false) {
            isValid = false;
            setUserRegisterError((pre) => {
                return {
                    ...pre,
                    phone: "Số điện thoại không hợp lệ"
                }
            });
        } else {
            setUserRegisterError((pre) => {
                return {
                    ...pre,
                    phone: ""
                }
            });
        }

        return isValid;
    }

    const handleSignUp = async () => {
        const isValid = checkValidateData();

        if (!agreedToTerms) {
            Alert.alert('Lỗi', 'Bạn phải đồng ý với Điều khoản & Dịch vụ.');
            // alert("Bạn phải đồng ý với Điều khoản & Dịch vụ.")
            return;
        }

        if (!isValid) {
            return;
        } else {
            try {
                setIsLoading(true);
                const response = await baseUrl.post("/auth/register", debouncedUserRegister);
                console.log(response);

                if (response.data.status === 201) {
                    Alert.alert("Thành Công", "Đăng ký thành công !");
                    navigation.navigate("Login");
                } else {
                    Alert.alert("Lỗi", "Đăng ký thất bại !");
                }
            } catch (error) {
                Alert.alert("Lỗi", error.message);
            } finally {
                setIsLoading(false);
            }
        }

    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}>
                <ScrollView
                    contentContainerStyle={styles.scrollViewContainer}
                    keyboardShouldPersistTaps="handled">
                    <View style={styles.innerContainer}>
                        {/* Logo */}
                        <Image
                            source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
                            style={styles.logo}
                        />

                        {/* Tiêu đề */}
                        <Text style={styles.title}>Tạo tài khoản mới</Text>
                        <Text style={styles.subtitle}>Điền thông tin để bắt đầu mua sắm</Text>

                        {/* Form đăng ký */}
                        <TextInput
                            style={styles.input}
                            placeholder="Họ và Tên"
                            placeholderTextColor="#888"
                            value={userRegister.fullName}
                            onChangeText={(value) => handlerChangeInput("fullName", value)}
                        />
                        {userRegisterError.fullName && <Text style={styles.inputError}>{userRegisterError.fullName}</Text>}

                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor="#888"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={userRegister.email}
                            onChangeText={(value) => handlerChangeInput("email", value)}
                        />
                        {userRegisterError.email && <Text style={styles.inputError}>{userRegisterError.email}</Text>}

                        <TextInput
                            style={styles.input}
                            placeholder="Số điện thoại"
                            placeholderTextColor="#888"
                            keyboardType="phone-pad"
                            value={userRegister.phone}
                            onChangeText={(value) => handlerChangeInput("phone", value)}
                        />
                        {userRegisterError.phone && <Text style={styles.inputError}>{userRegisterError.phone}</Text>}

                        <TextInput
                            style={styles.input}
                            placeholder="Mật khẩu"
                            placeholderTextColor="#888"
                            secureTextEntry={true}
                            value={userRegister.password}
                            onChangeText={(value) => handlerChangeInput("password", value)}
                        />
                        {userRegisterError.password && <Text style={styles.inputError}>{userRegisterError.password}</Text>}

                        {
                            isLoading && <ActivityIndicator size="large" color="green" />
                        }

                        {/* Điều khoản dịch vụ */}

                        <TouchableOpacity onPress={() => setAgreedToTerms(!agreedToTerms)} style={styles.checkboxContainer}>
                            <View style={[styles.checkbox, agreedToTerms && styles.checkboxChecked]}>

                                <Text style={styles.checkboxCheckmark}> {agreedToTerms && "✓"}</Text>
                            </View>
                            <Text style={styles.checkboxLabel}>Tôi đồng ý với Điều khoản & Dịch vụ</Text>
                        </TouchableOpacity>

                        {/* Nút đăng ký */}
                        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                            <Text style={styles.buttonText}>TẠO TÀI KHOẢN</Text>
                        </TouchableOpacity>

                        {/* Dải phân cách */}
                        <View style={styles.dividerContainer}>
                            <View style={styles.dividerLine} />
                            <Text style={styles.dividerText}>HOẶC</Text>
                            <View style={styles.dividerLine} />
                        </View>

                        {/* Đăng ký bằng mạng xã hội */}
                        <View style={styles.socialLoginContainer}>
                            <TouchableOpacity style={styles.socialButton}>
                                <Text style={[styles.socialButtonText, { color: '#DB4437' }]}>Google</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.socialButton}>
                                <Text style={[styles.socialButtonText, { color: '#4267B2' }]}>Facebook</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Chuyển tới trang đăng nhập */}
                        <View style={styles.loginContainer}>
                            <Text style={styles.loginText}>Đã có tài khoản? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                                <Text style={styles.loginLink}>Đăng nhập</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            <FlatList
                data={users}
                renderItem={({ item }) => <Text>{item.username}</Text>}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={() => <Text>No Data</Text>}
            />

            {
                isLoading && <ActivityIndicator size="large" color="green" />
            }
        </SafeAreaView>
    );
};

// "Bảng màu" tương tự trang đăng nhập
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollViewContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    innerContainer: {
        paddingHorizontal: 30,
        paddingVertical: 20,
    },
    logo: {
        width: 60,
        height: 60,
        alignSelf: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        color: '#333',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 30,
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
    inputError: {
        fontSize: 16,
        color: 'red',
        marginBottom: 8,
        marginTop: -12,
        marginLeft: 8
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 5,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#FF6347',
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxChecked: {
        backgroundColor: '#FF6347',
    },
    checkboxCheckmark: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    checkboxLabel: {
        fontSize: 14,
        color: '#333',
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
        marginVertical: 25,
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
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E8E8E8',
        marginHorizontal: 5,
    },
    socialButtonText: {
        fontWeight: '600',
        fontSize: 16,
    },
    loginContainer: {
        flexDirection: 'row',
        marginTop: 25,
        justifyContent: 'center',
    },
    loginText: {
        color: '#666',
        fontSize: 14,
    },
    loginLink: {
        color: '#FF6347',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default Register;