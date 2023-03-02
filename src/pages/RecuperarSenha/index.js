import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useContext } from "react";
import { ThemeContext } from "../../context/theme";
import { useState } from "react";
import { api } from "../../services/api";
export default function Login({ navigation }) {
  const [email, setEmail] = useState("")

  const form = {
    toemail: email,
    tipoTabela: "tecnicos"
  }
  const { styleTheme } = useContext(ThemeContext);

  console.log(email)
  function voltar() {
    navigation.navigate("Login");
  }


  async function getToken() {
    try{
      const response = await api.post("/email", form)

      console.log(response)

    }catch(error){
      console.log(error)
    }
  }
  let [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={[styles.container, styleTheme.container]}>
      <View style={styles.container_login}>
        <Text style={[styles.login, styleTheme.textPrimary]}>
          Recuperar Senha
        </Text>
      </View>

      <View style={styles.container_TextoInput}>
        <TextInput
          style={[styles.TextoInput, styleTheme.inputPrimary]}
          placeholder="E-mail"
          onChangeText={(e) => setEmail(e)}
          placeholderTextColor={styleTheme.textSecundary.color}
          keyboardType="email-address"
        />

        <TouchableOpacity style={[styles.Botao, styleTheme.buttonPress]} onPress={getToken}>
          <Text style={[styles.TextoBotao, styleTheme.buttonText]}>Enviar Email</Text>
        </TouchableOpacity>

        <View style={styles.containerTextoInfo}>
          <Text style={[styles.TextoInfo, styleTheme.textPrimary]}>
            Um link será enviado para que você possa redefinir sua senha.
          </Text>
        </View>

        <View style={styles.containerButtonBack}>
          <TouchableOpacity
            style={[styles.buttonBack, styleTheme.buttonPress]}
            onPress={voltar}
          >
            <MaterialCommunityIcons
              name="keyboard-backspace"
              size={40}
              color={styleTheme.buttonText.color}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  container_login: {
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
    borderRadius: 10,
    borderWidth: 2,
    padding: 15,
    fontFamily: "Poppins_400Regular",
  },
  TextoSenha: {
    width: "95%",
    height: 52,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderBottomColor: "#000",
    borderWidth: 2,
    padding: 15,
    marginTop: 10,
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
    textTransform: "uppercase",
  },
  containerTextoInfo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    top: 30,
  },
  TextoInfo: {
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    textAlign: "center",
  },
  buttonBack: {
    borderRadius: 50,
    width: 55,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
  },
  containerButtonBack: {
    marginTop: "15%",
    justifyContent: "center",
    alignItems: "center",
  },
});
