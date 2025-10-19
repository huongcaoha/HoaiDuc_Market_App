import React from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface OTPModalProps {
    modalOTP: boolean;
    handleCloseModalOTP: () => void;
    inputOTP: number;
    setInputOTP: (value: number) => void;
    handleRegister: () => void;
};
const OTPModal = ({ modalOTP, handleCloseModalOTP, inputOTP, setInputOTP, handleRegister }: OTPModalProps) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalOTP}
            onRequestClose={handleCloseModalOTP}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>Nhập mã OTP được gửi vào email của bạn.</Text>
                    <TextInput
                        style={styles.input}
                        value={inputOTP.toString()}
                        onChangeText={(value) => setInputOTP(Number(value))}
                        keyboardType="numeric"
                        placeholder="Mã OTP"
                    />

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.confirmButton} onPress={handleRegister}>
                            <Text style={styles.buttonText}>Xác nhận</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelButton} onPress={handleCloseModalOTP}>
                            <Text style={styles.buttonText}>Hủy</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        elevation: 5,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    confirmButton: {
        backgroundColor: '#007cff',
        padding: 15,
        borderRadius: 5,
        flex: 1,
        marginRight: 10,
    },
    cancelButton: {
        backgroundColor: '#ff0000',
        padding: 15,
        borderRadius: 5,
        flex: 1,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default OTPModal;