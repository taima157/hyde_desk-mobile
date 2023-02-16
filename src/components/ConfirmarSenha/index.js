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
import { useState } from "react";
var bcrypt = require("bcryptjs");
import { api } from "../../services/api";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ModalLoading from "../ModalLoading";

export default function ConfirmarSenha({
  navigation,
  senha,
  dados,
  image,
  id_tecnico,
  visibilidade,
  mudarVisibilidade,
}) {
  const [comparar, setComparar] = useState("");
  const [visivel, setVisivel] = useState(false);
  const [textVazio, setTextVazio] = useState(false);
  function senhas() {
    bcrypt.compare(comparar, senha, (error, valid) => {
      if (error) {
        console.log(error);
      }
      if (valid) {
        if (comparar.length > 0) {
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
            } catch (error) {
              console.log(error);
            }
          }
          enviarDados();

          navigation.navigate("Home");
        } else {
          setTextVazio(false);
          setVisivel(false);
        }
      } else {
        setTextVazio(true);
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
    <View style={styles.containerModal}>
      <Modal isVisible={visibilidade} backdropOpacity={0.1}>
        <View style={styles.modalView}>
          <View styles={styles.viewFechar}>
            <TouchableOpacity onPress={mudarVisibilidade} style={styles.nada}>
              <Text style={styles.textFechar}>X</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>Confirmar senha</Text>
          <View style={styles.containerInput}>
            <TextInput
              onChangeText={(comparar) => setComparar(comparar)}
              style={styles.inputPassword}
              placeholder="Senha:"
              placeholderTextColor="#000000"
              secureTextEntry={true}
            ></TextInput>
            {textVazio ? (
              <Text style={styles.textSenha}>Digite alguma senha válida</Text>
            ) : null}
            <TouchableOpacity
              onPress={() => {
                setVisivel(!visivel);
                senhas();
              }}
              style={styles.buttonConfirmar}
            >
              <Text style={styles.textConfirmar}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <ModalLoading isVisible={visivel} />
    </View>
  );
}

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: "#FFF",
    // marginTop: 200,
    // marginBottom: 200,
    marginLeft: 5,
    marginRight: 5,
    elevation: 10,
    borderRadius: 20,
  },
  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: 22,
    textAlign: "center",
    marginTop: 20,
  },
  inputPassword: {
    height: 50,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    height: 50,
    width: "80%",
    color: "#000",
    fontSize: 15,
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
    width: "80%",
    marginBottom: 50,
    marginTop: 20,
  },
  textConfirmar: {
    fontFamily: "Poppins_700Bold",
    color: "#fff",
    fontSize: 22,
  },
  viewFechar: {
    width: "100%",
    padding: 30,
  },
  textFechar: {
    paddingTop: 5,
    paddingRight: 15,
    fontFamily: "Poppins_700Bold",
    color: "#000",
    fontSize: 22,
    textAlign: "right",
  },
  textSenha: {
    display: "flex",
    textAlign: "center",
    fontFamily: "Poppins_600SemiBold",
    color: "#000",
    fontSize: 15,
    marginTop: 20,
  },
});
