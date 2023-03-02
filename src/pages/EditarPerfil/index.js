import { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import * as ImagePicker from "expo-image-picker";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_600SemiBold,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import ConfirmarSenha from "../../components/ConfirmarSenha";
import { ThemeContext } from "../../context/theme";

export default function EditarPerfil({ route, navigation }) {
  const { theme, styleTheme } = useContext(ThemeContext);
  const [modal, setModal] = useState(false);

  function toggleModal() {
    setModal(!modal);
  }
  const dados = route.params;

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

  function goBack() {
    navigation.navigate("Perfil", dados.receitas);
  }
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ScrollView style={styleTheme.container}>
      <View style={[styles.container, styleTheme.container]}>
        <View style={styles.viewImage}>
          <TouchableOpacity
            style={styles.imageOpacity}
            onPress={() => ObterImage()}
          >
            <MaterialCommunityIcons
              style={styles.caneta}
              name="pencil-outline"
              size={32}
              color="#23AFFF"
            />
            <Image
              style={[
                styles.ImgCamera,
                { borderColor: "#23AFFF", borderWidth: 2 },
              ]}
              source={
                image.uri.length != 0
                  ? { uri: image.uri }
                  : {
                      uri: `https://hdteste.azurewebsites.net/${dados.foto}`,
                    }
              }
            />
          </TouchableOpacity>
        </View>
        <View style={styles.viewInput}>
          <Text style={[styles.editarText, styleTheme.textPrimary]}>
            Editar Perfil
          </Text>
          <TextInput
            value={novosDados.nome}
            style={[styles.inputs, styleTheme.textPrimary]}
            onChangeText={(e) => setNovosDados({ ...novosDados, nome: e })}
            placeholder={`Nome: ${dados.nome}`}
            placeholderTextColor={styleTheme.textSecundary.color}
          ></TextInput>
          <TextInput
            style={[styles.inputs, styleTheme.textPrimary]}
            value={novosDados.email}
            onChangeText={(e) => setNovosDados({ ...novosDados, email: e })}
            placeholder={`Email: ${dados.email}`}
            placeholderTextColor={styleTheme.textSecundary.color}
          ></TextInput>

          <TextInput
            style={[styles.inputs, styleTheme.textPrimary]}
            value={novosDados.telefone}
            maxLength={11}
            onChangeText={(e) => setNovosDados({ ...novosDados, telefone: e })}
            keyboardType="numeric"
            placeholder={`Telefone: ${dados.telefone}`}
            placeholderTextColor={styleTheme.textSecundary.color}
          ></TextInput>
          <SelectList
            data={especialidade}
            search={false}
            save="value"
            setSelected={(e) =>
              setNovosDados({ ...novosDados, especialidade: e })
            }
            boxStyles={{
              borderWidth: 1,
              borderColor: "#a8a7a7",
              height: 50,
              width: "100%",
            }}
            dropdownTextStyles={styleTheme.textPrimary}
            inputStyles={[{ marginLeft: -10 }, styleTheme.textPrimary]}
            fontFamily="Poppins_400Regular"
            placeholder={`Especialidade: ${dados.especialidade}`}
          ></SelectList>
          <View style={styles.viewBotoes}>
            <TouchableOpacity style={styles.botoes} onPress={goBack}>
              <Text style={styles.textColor}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.botoes}
              onPress={() => {
                setModal(!modal);
              }}
            >
              <Text style={styles.textColor}>Editar</Text>
            </TouchableOpacity>
          </View>

          {modal ? (
            <ConfirmarSenha
              mudarVisibilidade={toggleModal}
              visibilidade={modal}
              navigation={navigation}
              id_tecnico={dados.id_tecnico}
              image={image}
              dados={novosDados}
              senha={dados.senha}
            />
          ) : null}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    padding: 20,
  },
  viewInput: {
    width: "100%",
    marginTop: 60,
  },
  viewImage: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
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
    justifyContent: "space-between",
  },
  botoes: {
    backgroundColor: "#23AFFF",
    width: 170,
    alignItems: "center",
    padding: 10,
    borderRadius: 30,
    marginTop: 30,
  },
  textColor: {
    color: "#FFF",
    fontFamily: "Poppins_700Bold",
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
    marginBottom: 20,
    width: "100%",
    fontFamily: "Poppins_400Regular",
  },
  caneta: {
    position: "absolute",
    marginLeft: "35%",

    zIndex: 10,
  },
  imageOpacity: {},
});
