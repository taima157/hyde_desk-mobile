import { useContext, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  useFonts,
  Poppins_600SemiBold,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import * as ImagePicker from "expo-image-picker";
import Modal from "react-native-modal";
import { ThemeContext } from "../../context/theme";

export default function ModalFinalizar({
  isVisible,
  finalizarChamado,
  toggleModalFinalizar,
}) {
  const { styleTheme } = useContext(ThemeContext);
  const [concluirChamado, setConcluirChamado] = useState({
    descricao: "",
    anexo: {
      uri: "",
      type: "",
      name: "",
    },
  });

  const [erroDescricao, setErroDescricao] = useState("");

  async function anexarImagem() {
    let resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!resultado.canceled) {
      let imageName = resultado.assets[0].uri.split("/");
      imageName = imageName[imageName.length - 1];

      let tipo = imageName.split(".")[1];

      setConcluirChamado({
        ...concluirChamado,
        anexo: {
          uri: resultado.assets[0].uri,
          type: `image/${tipo}`,
          name: imageName,
        },
      });
    }
  }

  function handleFinalizarChamado() {
    setErroDescricao("");

    if (concluirChamado.descricao) {
      finalizarChamado(concluirChamado);
    } else {
      setErroDescricao("A descrição é obrigatória!");
    }
  }

  let [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
    Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Modal isVisible={isVisible} backdropOpacity={0.3}>
      <View style={[styles.viewFinalizar, styleTheme.containerSecundary]}>
        <Text style={[styles.tituloFinalizar, styleTheme.textPrimary]}>
          Finalizar Chamado
        </Text>
        <View style={styles.viewDescricao}>
          <Text style={[styles.label, styleTheme.textPrimary]}>Descrição:</Text>
          <TextInput
            style={[styles.inputDescricao, styleTheme.textPrimary]}
            value={concluirChamado.descricao}
            onChangeText={(e) =>
              setConcluirChamado({ ...concluirChamado, descricao: e })
            }
          />
          <Text style={styles.erroDescricao}>{erroDescricao}</Text>
        </View>
        <View style={styles.viewAnexo}>
          <View style={styles.inputAnexo}>
            <Text style={[styles.label, styleTheme.textPrimary]}>
              Anexar alguma imagem:
            </Text>
            <TouchableOpacity style={styles.botaoAnexo} onPress={anexarImagem}>
              <Text style={styles.textoBotaoAnexo}>Selecionar</Text>
            </TouchableOpacity>
          </View>
          {concluirChamado.anexo.uri !== "" ? (
            <Image
              style={styles.imagemAnexo}
              source={{
                uri: concluirChamado.anexo.uri,
              }}
              resizeMode="contain"
            />
          ) : null}
        </View>
        <View style={styles.botoesFinalizar}>
          <TouchableOpacity
            style={styles.botao}
            onPress={() => {
              setConcluirChamado({
                decricao: "",
                anexo: {
                  uri: "",
                  type: "",
                  name: "",
                },
              });
              setErroDescricao("");
              toggleModalFinalizar();
            }}
          >
            <Text style={[styles.textoBotao, { color: "#23AFFF" }]}>
              Cancelar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.botao, { backgroundColor: "#23AFFF" }]}
            onPress={handleFinalizarChamado}
          >
            <Text style={[styles.textoBotao, { color: "#FFF" }]}>Concluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  viewFinalizar: {
    borderRadius: 20,
    elevation: 10,
    alignItems: "center",
    padding: 15,
  },
  tituloFinalizar: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 20,
    marginBottom: 20,
  },
  viewDescricao: {
    width: "100%",
  },
  inputDescricao: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#23AFFF",
    height: 40,
    paddingLeft: 10,
    fontFamily: "Poppins_400Regular",
  },
  viewAnexo: {
    width: "100%",
    display: "flex",
    marginBottom: 20,
    alignItems: "center",
  },
  inputAnexo: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  botaoAnexo: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#23AFFF",
    borderRadius: 5,
  },
  textoBotaoAnexo: {
    fontFamily: "Poppins_400Regular",
    color: "#FFF",
  },
  imagemAnexo: {
    width: "70%",
    height: 130,
    backgroundColor: "#000",
    marginTop: 20,
  },
  botoesFinalizar: {
    marginTop: 20,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  erroDescricao: {
    fontFamily: "Poppins_700Bold",
    color: "red",
    textAlign: "center",
    padding: 10,
  },
  label: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
  },
  botao: {
    width: "45%",
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "#23AFFF",
    padding: 6,
  },
  textoBotao: {
    textAlign: "center",
    fontFamily: "Poppins_600SemiBold",
  },
});
