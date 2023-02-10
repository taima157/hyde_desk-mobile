import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isExpired } from "react-jwt";
import jwtDecode from "jwt-decode";
import { useNavigation } from "@react-navigation/native";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  async function login() {}

  async function logout() {}

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
            setUser(userDecode)
            navigation.navigate("Logado")
          } else {
            await AsyncStorage.setItem("user", JSON.stringify([]));
          }
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
      {children}
    </AuthContext.Provider>
  );
}
