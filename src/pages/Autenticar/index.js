import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "../../context/theme";

export default function Autenticar({ logout, setAutenticado }) {
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
        setAutenticado(true);
        setTimeout(() => {
          navigation.navigate("Logado");
        }, 100);
      }
    } else {
      const isBiometricEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!isBiometricEnrolled) {
        const auth = await LocalAuthentication.authenticateAsync({
          promptMessage: "Login com senha",
          fallbackLabel: "Senha errada.",
        });

        if (auth.success) {
          setAutenticado(true);
          setTimeout(() => {
            navigation.navigate("Logado");
          }, 100);
        }
      }

      const auth = await LocalAuthentication.authenticateAsync({
        promptMessage: "Login com Biometria",
        fallbackLabel: "Biometria nâo encontrada.",
      });

      if (auth.success) {
        setAutenticado(true);
        setTimeout(() => {
          navigation.navigate("Logado");
        }, 100);
      }
    }
  }

  useEffect(() => {
    biometria();
  }, []);

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
      <View style={styles.encerrarSessao}>
        <TouchableOpacity onPress={logout}>
          <Text style={[styles.textoSessao, styleTheme.textPrimary]}>
            Encerrar sessão?
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
  encerrarSessao: {
    paddingBottom: 10,
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  textoSessao: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
  },
});
