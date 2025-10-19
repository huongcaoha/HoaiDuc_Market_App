import AsyncStorage from "@react-native-async-storage/async-storage";

export const checkLogin = async (navigation: any) => {
    const fullName = await AsyncStorage.getItem("fullName");
    if (fullName) {
        return fullName;
    } else {
        navigation.navigate("Login2");
        return null;

    };
}