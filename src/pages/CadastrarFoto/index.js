import { useContext, useEffect, useState } from "react";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import * as ImagePicker from "expo-image-picker";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { api } from "../../services/api";
import ModalLoading from "../../components/ModalLoading";
import { AuthContext } from "../../context/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeContext } from "../../context/theme";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { sendNotification } from "../../utils";

export default function CadastrarFoto({ navigation }) {
  const { errorToast, successToast } = useContext(AuthContext);
  const { styleTheme } = useContext(ThemeContext);
  const [data, setData] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    async function getStorage() {
      const cadastroLocal = await AsyncStorage.getItem("cadastro");

      setData(JSON.parse(cadastroLocal));
    }

    getStorage();
  }, []);

  const [image, setImage] = useState({
    uri: "",
    type: "",
    name: "",
  });

  async function cadastrar() {
    if (image.uri === "") {
      errorToast("Foto", "Selecione uma foto de perfil!");
      return;
    }

    const form = new FormData();

    form.append("nome", data.nome);
    form.append("cpf", data.cpf);
    form.append("email", data.email);
    form.append("telefone", data.telefone);
    form.append("especialidade", data.especialidade);
    form.append("senha", data.senha);
    form.append("confirmsenha", data.senha);
    form.append("foto", image);

    try {
      setModalVisible(true);

      const response = await api.post("/tecnicos/cadastro", form, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      successToast("Cadastro", response.data.message);

      navigation.navigate("Login");

      await sendNotification({
        title: "Boas-vindas.",
        body: "Seja bem-vindo ao nosso aplicativo! Estamos felizes em tê-lo conosco.",
        time: {
          seconds: 1,
        },
      });
    } catch (error) {
      setModalVisible(false);

      if (error.response.data) {
        errorToast("Erro ao se cadastrar", error.response.data.message);
      } else {
        errorToast("Erro ao se cadastrar", "Tente novamente mais tarde!");
      }

      navigation.navigate("Login");
    }
  }

  async function ObterImage(tipo) {
    let result;

    if (tipo === "galeria") {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    } else {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    }

    if (!result.canceled) {
      let imageName = result.assets[0].uri.split("/");
      imageName = imageName[imageName.length - 1];

      let tipo = imageName.split(".")[1];

      setImage({
        uri: result.assets[0].uri,
        type: `image/${tipo}`,
        name: imageName,
      });
    }
  }

  function voltar() {
    navigation.navigate("CadastroContato");
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
      <View style={styles.container_CadastrarFoto}>
        <Text style={[styles.CadastrarFoto, styleTheme.textPrimary]}>
          Cadastro
        </Text>
      </View>

      <View style={styles.container_card}>
        <View style={[styles.card_AdicionarUsuarios, styleTheme.inputPrimary]}>
          <View style={styles.container_ImageCard}>
            <Image
              style={styles.ImgCamera}
              source={
                image.uri.length != 0
                  ? { uri: image.uri }
                  : require("../../../assets/image.png")
              }
            />
          </View>

          <View style={styles.viewButtonsFoto}>
            <TouchableOpacity
              onPress={() => ObterImage("galeria")}
              style={[styles.buttonFoto, styleTheme.buttonPress]}
            >
              <MaterialIcons name="photo-library" size={24} color="white" />
              <Text style={[styles.buttonFotoText, styleTheme.buttonText]}>
                Galeria
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => ObterImage("camera")}
              style={[styles.buttonFoto, styleTheme.buttonPress]}
            >
              <MaterialIcons name="camera-alt" size={24} color="white" />
              <Text style={[styles.buttonFotoText, styleTheme.buttonText]}>
                Câmera
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.containerButtonNext}>
        <TouchableOpacity
          style={[styles.buttonNext, styleTheme.buttonPress]}
          onPress={cadastrar}
        >
          <Text style={[styles.textNext, styleTheme.buttonText]}>
            Finalizar
          </Text>
        </TouchableOpacity>
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
      <ModalLoading isVisible={modalVisible} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  container_CadastrarFoto: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingBottom: "1%",
    paddingLeft: "1%",
  },
  CadastrarFoto: {
    paddingLeft: "2%",
    fontSize: 36,
    fontFamily: "Poppins_700Bold",
  },
  container_card: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  card_AdicionarUsuarios: {
    width: "80%",
    paddingTop: 40,
    paddingBottom: 20,
    borderRadius: 10,
    borderWidth: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    marginTop: 20,
  },
  container_ImageCard: {
    backgroundColor: "#D9D9D9",
    width: 125,
    height: 125,
    borderRadius: 100,
    display: "flex",
    justifyContent: "center",
  },
  container_foto: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  ImgCamera: {
    width: 125,
    height: 125,
    borderRadius: 100,
  },
  buttonNext: {
    backgroundColor: "#000000",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "95%",
    borderColor: "#23AFFF",
  },
  containerButtonNext: {
    marginTop: "2%",
    justifyContent: "center",
    alignItems: "center",
  },
  containerButtonBack: {
    marginTop: "15%",
    justifyContent: "center",
    alignItems: "center",
  },
  textNext: {
    color: "#fff",
    fontSize: 16,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  containerButtonBack: {
    marginTop: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonBack: {
    borderRadius: 50,
    width: 55,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
  },
  viewButtonsFoto: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 40,
    paddingLeft: 15,
    paddingRight: 15,
  },
  buttonFoto: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
  },
  buttonFotoText: {
    fontFamily: "Poppins_400Regular",
    paddingLeft: 10,
    paddingRight: 10,
  },
});
