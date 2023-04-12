import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { Alert } from "react-native";
import { useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "../../context/theme";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_400Regular,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";

export default function Autenticado() {
  const navigation = useNavigation();
  const { styleTheme } = useContext(ThemeContext);

  async function biometria() {
    const biometricExist = await LocalAuthentication.hasHardwareAsync();

    if (!biometricExist) {
      const auth = await LocalAuthentication.authenticateAsync({
        promptMessage: "Login com senha",
        fallbackLabel: "Senha errada.",
      });

      if (auth.success) {
        navigation.navigate("Logado");
      }
    } else {
      const isBiometricEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!isBiometricEnrolled) {
        const auth = await LocalAuthentication.authenticateAsync({
          promptMessage: "Login com senha",
          fallbackLabel: "Senha errada.",
        });

        if (auth.success) {
          navigation.navigate("Logado");
        }
      }

      const auth = await LocalAuthentication.authenticateAsync({
        promptMessage: "Login com Biometria",
        fallbackLabel: "Biometria nâo encontrada.",
      });

      if (auth.success) {
        navigation.navigate("Logado");
      }
    }
  }

  useEffect(() => {
    biometria();
  }, []);

  let [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={[styles.container, styleTheme.container]}>
      <View style={styles.logo}>
        <Text>
          <Text style={styles.help}>Hyde</Text>
          <Text style={[styles.desk, styleTheme.textPrimary]}>Desk</Text>
        </Text>
      </View>
      <View style={styles.biometria}>
        <TouchableOpacity
          onPress={biometria}
          style={[styles.botao, styleTheme.buttonPress]}
        >
          <Text style={[styles.botaoTexto, styleTheme.buttonText]}>
            Biometria ou senha
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
  },
  logo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  help: {
    fontSize: 45,
    fontFamily: "Poppins_700Bold",
    color: "#23AFFF",
  },
  desk: {
    fontSize: 45,
    fontFamily: "Poppins_700Bold",
  },
  biometria: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  botao: {
    width: "65%",
    display: "flex",
    padding: 12,
    alignItems: "center",
    borderRadius: 30,
  },
  botaoTexto: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
});
