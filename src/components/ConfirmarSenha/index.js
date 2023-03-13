import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_400Regular,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import { useContext, useState } from "react";
var bcrypt = require("bcryptjs");
import { api } from "../../services/api";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ModalLoading from "../ModalLoading";
import { ThemeContext } from "../../context/theme";
import { AuthContext } from "../../context/auth";

export default function ConfirmarSenha({
  navigation,
  senha,
  dados,
  image,
  id_tecnico,
  visibilidade,
  mudarVisibilidade,
}) {
  const { successToast, errorToast } = useContext(AuthContext);
  const { styleTheme } = useContext(ThemeContext);
  const [comparar, setComparar] = useState("");
  const [visivel, setVisivel] = useState(false);
  const [textVazio, setTextVazio] = useState(false);

  function senhas() {
    if (comparar.length === 0) {
      errorToast("Alterar dados", "Digite uma senha válida");
      return;
    }

    setVisivel(true);

    bcrypt.compare(comparar, senha, async (error, valid) => {
      if (error) {
        return;
      }
      if (valid) {
        async function enviarDados() {
          const form = new FormData();

          form.append("nome", dados.nome);
          form.append("email", dados.email);
          form.append("telefone", dados.telefone);
          form.append("especialidade", dados.especialidade);
          if (image.uri != "") {
            form.append("foto", image);
          }

          try {
            const response = await api.put(
              `/tecnicos/editar/${id_tecnico}`,
              form,
              {
                headers: {
                  "content-type": "multipart/form-data",
                },
              }
            );

            successToast("Alterar dados", response.data.message);
            setVisivel(false);
          } catch (error) {
            setVisivel(false);
            if (error.response.data.message) {
              errorToast("Alterar dados", error.response.data.message);
            } else {
              errorToast("Alterar dados", "Não foi possível alterar os dados.");
            }
          }
        }

        await enviarDados();
        navigation.navigate("Perfil");
      } else {
        errorToast("Alterar dados", "Senha incorreta");
        setVisivel(false);
      }
    });
  }

  let [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Modal isVisible={visibilidade} backdropOpacity={0.2}>
      <View style={[styles.modalView, styleTheme.containerSecundary]}>
        <Text style={[styles.title, styleTheme.textPrimary]}>
          Confirmar senha
        </Text>
        <View style={styles.containerInput}>
          <TextInput
            onChangeText={(comparar) => setComparar(comparar)}
            style={[styles.inputPassword, styleTheme.inputSecundary]}
            placeholder="Senha:"
            placeholderTextColor={styleTheme.textSecundary.color}
            secureTextEntry={true}
          ></TextInput>
          {textVazio ? (
            <Text style={styles.textSenha}>Digite alguma senha válida</Text>
          ) : null}
          <View style={styles.viewBotoes}>
            <TouchableOpacity
              onPress={mudarVisibilidade}
              style={styles.buttonConfirmar}
            >
              <Text style={styles.textConfirmar}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                senhas();
              }}
              style={styles.buttonConfirmar}
            >
              <Text style={styles.textConfirmar}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ModalLoading isVisible={visivel} />
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    elevation: 10,
    borderRadius: 20,
  },
  title: {
    marginTop: 20,
    fontFamily: "Poppins_700Bold",
    fontSize: 22,
    textAlign: "center",
  },
  inputPassword: {
    marginTop: 20,
    width: "80%",
    fontSize: 16,
    height: 50,
    borderRadius: 10,
    borderWidth: 2,
    padding: 10,
    fontFamily: "Poppins_400Regular",
  },
  containerInput: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonConfirmar: {
    backgroundColor: "#23AFFF",
    height: 50,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    width: "40%",
    marginTop: 30,
    marginBottom: 30,
  },
  textConfirmar: {
    fontFamily: "Poppins_700Bold",
    color: "#fff",
    fontSize: 16,
  },
  textFechar: {
    fontSize: 32,
    textAlign: "right",
    marginTop: 10,
    marginRight: 10,
  },
  textSenha: {
    display: "flex",
    textAlign: "center",
    fontFamily: "Poppins_600SemiBold",
    color: "red",
    fontSize: 15,
    marginTop: 20,
  },
  viewBotoes: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
