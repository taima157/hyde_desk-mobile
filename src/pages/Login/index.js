import { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import { AuthContext } from "../../context/auth";
import ModalLoading from "../../components/ModalLoading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeContext } from "../../context/theme";

export default function Login({ navigation }) {
  const { login, errorToast } = useContext(AuthContext);
  const { styleTheme } = useContext(ThemeContext);
  const [user, setUser] = useState({
    cpf: "",
    senha: "",
  });

  const [loading, setLoading] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");

  async function handleLogin() {
    try {
      setUser({
        cpf: "",
        senha: "",
      });

      setMensagemErro("");
      setLoading(true);
      await login(user);
      setLoading(false);
    } catch (error) {
      setLoading(false);

      if (error.message) {
        errorToast("Login", error.message);
      } else {
        errorToast("Login", "Erro na autenticação");
      }

      setUser({
        cpf: "",
        senha: "",
      });
    }
  }

  function goToCadastrar() {
    navigation.navigate("Cadastro");
  }
  function goToRecuperarSenha() {
    navigation.navigate("Recuperar Senha");
  }

  useEffect(() => {
    navigation.addListener("focus", async () => {
      await AsyncStorage.setItem("cadastro", JSON.stringify({}));
    });
  }, [navigation]);

  let [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={[styles.container, styleTheme.container]}>
      <View>
        <View style={styles.container_login}>
          <Text style={[styles.login, styleTheme.textPrimary]}>Login</Text>
        </View>
        <View style={styles.container_TextoInput}>
          <TextInput
            style={[styles.TextoInput, styleTheme.inputPrimary]}
            placeholder="CPF:"
            placeholderTextColor={styleTheme.textSecundary.color}
            value={user.cpf}
            onChangeText={(e) => setUser({ ...user, cpf: e })}
            keyboardType="numeric"
            maxLength={11}
          />
          <TextInput
            style={[styles.TextoSenha, styleTheme.inputPrimary]}
            placeholder="Senha:"
            secureTextEntry={true}
            placeholderTextColor={styleTheme.textSecundary.color}
            value={user.senha}
            onChangeText={(e) => setUser({ ...user, senha: e })}
          />
          {mensagemErro.length !== 0 ? (
            <Text
              style={{
                color: "red",
                textAlign: "center",
                fontWeight: "500",
                marginTop: 10,
              }}
            >
              {mensagemErro}
            </Text>
          ) : null}
          <TouchableOpacity
            style={[styles.Botao, styleTheme.buttonPress]}
            onPress={() => handleLogin()}
          >
            <Text style={[styles.TextoBotao, styleTheme.buttonText]}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container_link}>
          <Text
            style={[
              { fontFamily: "Poppins_400Regular" },
              styleTheme.textPrimary,
            ]}
          >
            Ainda não é um técnico?
          </Text>
          <TouchableOpacity
            style={styles.LinkCadastro}
            onPress={() => goToCadastrar()}
          >
            <Text style={styles.TextoLinkCadastro}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container_link2}>
          <Text
            style={[
              { fontFamily: "Poppins_400Regular" },
              styleTheme.textPrimary,
            ]}
          >
            Esqueceu a senha?
          </Text>
          <TouchableOpacity
            style={styles.LinkCadastro}
            onPress={() => goToRecuperarSenha()}
          >
            <Text style={styles.TextoLinkCadastro}>Recuperar senha</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ModalLoading isVisible={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  container_login: {
    marginTop: "40%",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingBottom: "2%",
    paddingLeft: "1%",
  },

  login: {
    padding: "2%",
    fontSize: 36,
    fontFamily: "Poppins_700Bold",
  },

  container_TextoInput: {
    width: "100%",
    alignItems: "center",
  },

  TextoInput: {
    width: "95%",
    height: 50,
    borderRadius: 10,
    borderWidth: 2,
    padding: 10,
    fontFamily: "Poppins_400Regular",
  },
  TextoSenha: {
    width: "95%",
    height: 50,
    borderRadius: 10,
    borderWidth: 2,
    marginTop: 10,
    fontFamily: "Poppins_400Regular",
    padding: 10,
  },
  Botao: {
    borderRadius: 10,
    width: "95%",
    height: 52,
    marginTop: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  TextoBotao: {
    fontSize: 16,
    textTransform: "uppercase",
    fontFamily: "Poppins_700Bold",
  },

  container_link: {
    paddingTop: "15%",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  TextoLinkCadastro: {
    paddingLeft: 5,
    color: "#23AFFF",
    fontFamily: "Poppins_400Regular",
  },
  container_link2: {
    paddingTop: 5,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  textRecuperar: {
    fontFamily: "Poppins_400Regular",
  },
});
