import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


const baseUrl = axios.create({
    baseURL: "http://192.168.1.233:8080/api.hoaiducmarket.com/v1",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"

    },

});

baseUrl.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

baseUrl.interceptors.response.use(async (response) => {
    if (response.data.status === 401 && response.data.message === "Token expired") {
        try {
            const refreshToken = await AsyncStorage.getItem("refreshToken");

            const response = await baseUrl.post("/auths/refresh-token", {
                refreshToken: refreshToken
            });

            if (response) {
                const newAccessToken = response.data.accessToken;
                await AsyncStorage.setItem("accessToken", JSON.stringify(newAccessToken));
                response.config.headers.Authorization = `Bearer ${newAccessToken}`;
                return (await axios(response.config)).data;
            }
        } catch (error) {
            alert(error);
            return Promise.reject(error);

        }


    }
    return response;
})

export default baseUrl;