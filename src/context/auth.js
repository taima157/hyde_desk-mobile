import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../services/api";
import jwtDecode from "jwt-decode";
import { useNavigation } from "@react-navigation/native";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import LoadingScreen from "../pages/LoadingScreen";
import Autenticar from "../pages/Autenticar";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  const [logado, setLogado] = useState(false);
  const [autenticado, setAutenticado] = useState(false);
  const [loading, setLoading] = useState(true);

  const [canBack, setCanBack] = useState(false);

  function errorToast(text1, text2) {
    Toast.show({
      type: "error",
      text1: text1,
      text2: text2,
      topOffset: 50,
      visibilityTime: 4000,
    });
  }

  function successToast(text1, text2) {
    Toast.show({
      type: "success",
      text1: text1,
      text2: text2,
      topOffset: 50,
      visibilityTime: 4000,
    });
  }

  async function login(user) {
    try {
      const response = await api.post("/tecnicos/login", user);

      const decodeUser = jwtDecode(response.data.token);
      setUser(decodeUser);

      await AsyncStorage.setItem("user", JSON.stringify([response.data.token]));

      api.defaults.headers.Authorization = `Basic ${response.data.token}`;

      successToast("Login", response.data.message);

      navigation.navigate("Logado");
    } catch (error) {
      console.log(error);
      throw new Error("CPF ou senha inválidos");
    }
  }

  async function logout() {
    setUser(null);
    await AsyncStorage.setItem("user", JSON.stringify([]));
    setLogado(false);

    setTimeout(() => {
      navigation.navigate("Login");
    }, 100);
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
            api.defaults.headers.Authorization = `Basic ${userLocal[0]}`;

            setLogado(true);
            return true;
          } else {
            await AsyncStorage.setItem("user", JSON.stringify([]));
          }
        } else {
          setUser(null);
        }
      }
    } catch (error) {
      errorToast("Erro", "Houve um erro.");
    }
  }

  async function handleStates() {
    await estaLogado();
    setLoading(false);
  }

  useEffect(() => {
    handleStates();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        canBack,
        setCanBack,
        login,
        logout,
        estaLogado,
        successToast,
        errorToast,
        estaLogado,
      }}
    >
      {logado ? (
        autenticado ? (
          children
        ) : (
          <Autenticar
            logout={logout}
            setAutenticado={(e) => setAutenticado(e)}
          />
        )
      ) : (
        children
      )}
      <Toast />
    </AuthContext.Provider>
  );
}
