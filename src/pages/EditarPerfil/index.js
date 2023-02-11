import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { api } from "../../services/api";
import { SelectList } from "react-native-dropdown-select-list";
import * as ImagePicker from "expo-image-picker";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_600SemiBold,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
export default function EditarPerfil({ route, navigation }) {
  const dados = route.params;
  const [selectedValue, setSelectedValue] = useState("");
  const [image, setImage] = useState({
    uri: "",
    type: "",
    name: "",
  });
  const [novosDados, setNovosDados] = useState({
    nome: dados.nome,
    email: dados.email,
    especialidade: dados.especialidade,
    telefone: dados.telefone
  });
  const especialidade = [
    { key: "1", value: "Hardware" },
    { key: "2", value: "Rede" },
    { key: "3", value: "Sistema Operacional" },
    { key: "4", value: "Software" },
  ];
  const ObterImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

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
  };

  console.log(novosDados)

  async function enviarDados() {
    const form = new FormData();

    form.append("nome", novosDados.nome);
    form.append("email", novosDados.email);
    form.append("telefone", novosDados.telefone);
    form.append("especialidade", novosDados.especialidade);
    if (image.uri != "") {
      form.append("foto", image);
    }


    console.log(image);
    try {
      const response = await api.put(`/tecnicos/editar/${dados.id_tecnico}`, form);
      console.log(response)
    } catch (error) {
      console.log(error);
    }
  }

  function goBack() {
    navigation.navigate("Perfil");
  }
  function goHome() {
    navigation.navigate("Home");
  }

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_600SemiBold
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ backgroundColor: "#fff", height: "100%" }}>
      <View style={styles.viewImage}>
        <TouchableOpacity
          style={styles.imageOpacity}
          onPress={() => ObterImage()}
        >
          <Image
            style={styles.ImgCamera}
            source={
              image.uri.length != 0
                ? { uri: image.uri }
                : {
                  uri: `https://hydedeskteste.azurewebsites.net/${dados.foto}`,
                }
            }
          />
        </TouchableOpacity>
      </View>
      <View style={styles.viewInput}>
        <Text style={styles.editarText}>Editar Perfil</Text>
        <TextInput
        value={novosDados.nome}
          style={styles.inputs}
          onChangeText={(e) => setNovosDados({ ...novosDados, nome: e })}
          placeholder={`Nome: ${dados.nome}`}
        ></TextInput>
        <TextInput
          style={styles.inputs}
          value={novosDados.email}
          onChangeText={(e) => setNovosDados({ ...novosDados, email: e })}
          placeholder={`Email: ${dados.email}`}
        ></TextInput>

        <TextInput
          style={styles.inputs}
          value={novosDados.telefone}
          maxLength={11}
          onChangeText={(e) => setNovosDados({ ...novosDados, telefone: e })}
          keyboardType="numeric"
          placeholder={`Telefone: ${dados.telefone}`}
        ></TextInput>
        <SelectList
          data={especialidade}
          save="value"
          setSelected={(e) =>
            setNovosDados({ ...novosDados, especialidade: e })
          }
          boxStyles={{ borderWidth: 1, borderColor: "#a8a7a7", height: 50, width: "100%", }}
          inputStyles={{marginLeft: -10 }}
          fontFamily='Poppins_400Regular'
          placeholder={`Especialidade: ${dados.especialidade}`}
        ></SelectList>
        <View style={styles.viewBotoes}>
          <TouchableOpacity style={styles.botoes} onPress={goBack}>
            <Text style={styles.textColor}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botoes} onPress={() => {
            enviarDados()
            goHome()
          }}>
            <Text style={styles.textColor}>Editar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewInput: {
    width: "100%",
    padding: 10,
    marginTop: 20,
  },
  viewImage: {
    width: "100%",
    alignItems: "center",
    marginTop: 50,
  },
  ImgCamera: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  viewBotoes: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  botoes: {
    backgroundColor: "#23AFFF",
    width: 170,
    alignItems: "center",
    padding: 10,
    borderRadius: 30,
    marginTop: 20,
  },
  textColor: {
    color: "#FFF",
    fontFamily: "Poppins_700Bold"
  },
  editarText: {
    marginBottom: 20,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 22,
  },
  inputs: {
    height: 40,
    borderBottomColor: "#a8a7a7",
    borderBottomWidth: 1,
    marginBottom: 10,
    width: "100%",
    fontFamily: "Poppins_400Regular"
  }
});
