import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../services/api";
import jwtDecode from "jwt-decode";
import { useNavigation } from "@react-navigation/native";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { View } from "react-native";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  async function login(user) {
    try {
      const response = await api.post("/tecnicos/login", user);

      const decodeUser = jwtDecode(response.data.token);

      setUser(decodeUser);

      await AsyncStorage.setItem("user", JSON.stringify([response.data.token]));

      Toast.show({
        type: "success",
        text1: "Login",
        text2: response.data.message,
        topOffset: 0,
        duration: 10000,
      });

      navigation.navigate("Logado");
    } catch (error) {
      throw new Error("CPF ou senha inválidos");
    }
  }

  async function logout() {
    await AsyncStorage.setItem("user", JSON.stringify([]));
    setUser(null);
    navigation.navigate("Login");
  }

  async function estaLogado() {
    try {
      const user = await AsyncStorage.getItem("user");

      if (user !== null) {
        const userLocal = JSON.parse(user);

        if (userLocal.length !== 0) {
          const userDecode = jwtDecode(userLocal[0]);

          let expired = false;

          if (Date.now() >= userDecode.exp * 1000) {
            expired = true;
          }

          if (!expired) {
            setUser(userDecode);
            navigation.navigate("Logado");
          } else {
            await AsyncStorage.setItem("user", JSON.stringify([]));
          }
        } else {
          setUser(null);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    estaLogado();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, estaLogado }}>
      <View style={{ flex: 1 }}>
        <Toast />
        {children}
      </View>
    </AuthContext.Provider>
  );
}
