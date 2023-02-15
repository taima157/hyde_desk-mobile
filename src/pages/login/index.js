import { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import { AuthContext } from "../../context/auth";
import ModalLoading from "../../components/ModalLoading";

export default function Login({ navigation }) {
  const { login, errorToast } = useContext(AuthContext);
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

    } catch (error) {
      setLoading(false);

      if (error.message) {
        errorToast("Login", error.message)
      } else {
        errorToast("Login", "Erro na autenticação")
      }

      setUser({
        cpf: "",
        senha: "",
      });
    }
  }

  let [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  function goToCadastrar() {
    navigation.navigate("Cadastro");
  }

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.container_login}>
          <Text style={styles.login}>Login</Text>
        </View>
        <View style={styles.container_TextoInput}>
          <TextInput
            style={styles.TextoInput}
            placeholder="CPF"
            placeholderTextColor="#909090"
            value={user.cpf}
            onChangeText={(e) => setUser({ ...user, cpf: e })}
            keyboardType="numeric"
            maxLength={11}
          />
          <TextInput
            style={styles.TextoSenha}
            placeholder="Senha"
            secureTextEntry={true}
            placeholderTextColor="#909090"
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
          <TouchableOpacity style={styles.Botao} onPress={() => handleLogin()}>
            <Text style={styles.TextoBotao}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container_link}>
          <Text style={{fontFamily: "Poppins_400Regular"}}>Ainda não é um técnico?</Text>
          <TouchableOpacity
            style={styles.LinkCadastro}
            onPress={() => goToCadastrar()}
          >
            <Text style={styles.TextoLinkCadastro}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container_link2}>
          <Text style={{fontFamily: "Poppins_400Regular"}}>Esqueceu a senha?</Text>
          <TouchableOpacity style={styles.LinkCadastro} onPress={() => ""}>
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
    height: 52,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderBottomColor: "#000",
    borderWidth: 2,
    paddingLeft: 15,
    fontFamily: "Poppins_400Regular",
  },
  TextoSenha: {
    width: "95%",
    height: 52,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderBottomColor: "#000",
    borderWidth: 2,
    marginTop: 10,
    fontFamily: "Poppins_400Regular",
    paddingLeft: 15
  },
  Botao: {
    backgroundColor: "#000",
    borderRadius: 10,
    width: "95%",
    height: 52,
    marginTop: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  TextoBotao: {
    color: "#fff",
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
    fontFamily: "Poppins_400Regular"
  },

  container_link2: {
    paddingTop: 5,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  modalLoading: {
    justifyContent: "center",
    alignItems: "center",
  },
  viewModalLoading: {
    backgroundColor: "#FFF",
    width: "80%",
    paddingTop: 30,
    paddingBottom: 20,
    borderRadius: 10,
    elevation: 10,
  },
  textoLoading: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    fontFamily: "Poppins_400Regular",
  },
});
