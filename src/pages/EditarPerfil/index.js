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
    telefone: dados.telefone,
    foto: dados.foto,
  });
  const esepecilidade = [
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
  console.log(dados);

  async function enviarDados() {
    const form = new FormData();

    form.append("nome", novosDados.nome);
    form.append("email", novosDados.email);
    form.append("telefone", novosDados.telefone);
    form.append("especialidade", novosDados.especialidade);
    form.append("foto", novosDados.foto);

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
        style={styles.inputs}
          onChangeText={(e) => setNovosDados({ ...novosDados, nome: e })}
          placeholder={`Nome: ${dados.nome}`}
        ></TextInput>
        <TextInput
        style={styles.inputs}
          onChangeText={(e) => setNovosDados({ ...novosDados, email: e })}
          placeholder={`Email: ${dados.email}`}
        ></TextInput>
        <SelectList
          data={esepecilidade}
          save="value"
          setSelected={(e) =>
            setNovosDados({ ...novosDados, especialidade: e })
          }
          placeholder={`Especialidade: ${dados.especialidade}`}
        ></SelectList>
        <TextInput
        style={styles.inputs}
          maxLength={11}
          onChangeText={(e) => setNovosDados({ ...novosDados, telefone: e })}
          keyboardType="numeric"
          placeholder={`Telefone: ${dados.telefone}`}
        ></TextInput>
        <View style={styles.viewBotoes}>
          <TouchableOpacity style={styles.botoes} onPress={goBack}>
            <Text style={styles.textColor}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botoes} onPress={enviarDados}>
            <Text style={styles.textColor}>Editar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewInput: {
    marginTop: 50,
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
  },
  editarText: {
    marginBottom: 50,
  },
  inputs :{
    borderBottomColor: ""
  }
});
