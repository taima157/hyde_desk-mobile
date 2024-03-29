import { useContext, useState } from "react";
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
import * as yup from "yup";
import { Formik } from "formik";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ConfirmarSenha from "../../components/ConfirmarSenha";
import { ThemeContext } from "../../context/theme";
import { API_URL } from "@env";

export default function EditarPerfil({ route, navigation }) {
  const dados = route.params;
  const { styleTheme } = useContext(ThemeContext);

  const yupSchema = yup.object({
    nome: yup.string().required("Digite seu nome"),
    email: yup.string().email("E-mail inválido").required("Digite seu e-mail"),
    telefone: yup
      .string()
      .min(11, "Telefone inválido")
      .required("Digite seu telefone"),
    especialidade: yup.string().required("Selecione uma especialidade"),
  });

  const [modal, setModal] = useState(false);

  function handleSubmit(values) {
    if (values.especialidade.length < 2) {
      values.especialidade =
        especialidade[Number(values.especialidade) - 1].value;
    }

    setNovosDados({
      nome: values.nome,
      email: values.email,
      especialidade: values.especialidade,
      telefone: values.telefone,
    });

    toggle();
  }

  function toggle() {
    setModal(!modal);
  }

  const [novosDados, setNovosDados] = useState({
    nome: dados.nome,
    email: dados.email,
    especialidade: dados.especialidade,
    telefone: dados.telefone,
  });

  const [image, setImage] = useState({
    uri: "",
    type: "",
    name: "",
  });

  const especialidade = [
    { key: "1", value: "Software" },
    { key: "2", value: "Infraestrutura" },
    { key: "3", value: "Hardware" },
  ];

  async function ObterImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
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
  }

  function goBack() {
    navigation.navigate("Perfil");
  }

  return (
    <ScrollView style={[{ flex: 1 }, styleTheme.container]}>
      <View style={[styles.container, styleTheme.container]}>
        <View style={styles.viewImage}>
          <TouchableOpacity style={styles.imageOpacity} onPress={ObterImage}>
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
                      uri: API_URL + dados.foto,
                    }
              }
            />
          </TouchableOpacity>
        </View>
        <View style={styles.viewInput}>
          <Text style={[styles.editarText, styleTheme.textPrimary]}>
            Editar Perfil
          </Text>

          <Formik
            validationSchema={yupSchema}
            initialValues={{
              nome: dados.nome_tecnico,
              email: dados.email_tecnico,
              telefone: dados.telefone,
              especialidade: dados.especialidade,
            }}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ handleChange, handleSubmit, values, errors, submitCount }) => (
              <>
                <View style={styles.containerInputs}>
                  {errors.nome && submitCount ? (
                    <Text style={styles.labelError}>{errors.nome}</Text>
                  ) : null}
                  <TextInput
                    style={[styles.inputs, styleTheme.textPrimary]}
                    placeholder={`Nome: ${dados.nome_tecnico}`}
                    onChangeText={handleChange("nome")}
                    value={values.nome}
                    placeholderTextColor={styleTheme.textSecundary.color}
                  />

                  {errors.email && submitCount ? (
                    <Text style={styles.labelError}>{errors.email}</Text>
                  ) : null}
                  <TextInput
                    style={[styles.inputs, styleTheme.inputPrimary]}
                    placeholder={`Email: ${dados.email_tecnico}`}
                    onChangeText={handleChange("email")}
                    value={values.email}
                    placeholderTextColor={styleTheme.textSecundary.color}
                  />

                  {errors.telefone && submitCount ? (
                    <Text style={styles.labelError}>{errors.telefone}</Text>
                  ) : null}
                  <TextInput
                    style={[styles.inputs, styleTheme.inputPrimary]}
                    placeholder={`Telefone: ${dados.telefone}`}
                    onChangeText={handleChange("telefone")}
                    value={values.telefone}
                    placeholderTextColor={styleTheme.textSecundary.color}
                  />

                  <View style={styles.containerSelectList}>
                    {errors.especialidade && submitCount ? (
                      <Text style={styles.labelError}>
                        {errors.especialidade}
                      </Text>
                    ) : null}
                    <SelectList
                      data={especialidade}
                      value={values.especialidade}
                      setSelected={handleChange("especialidade")}
                      search={false}
                      placeholder={`Especialidade: ${values.especialidade}`}
                      boxStyles={{
                        borderWidth: 1,
                        borderColor: "#a8a7a7",
                        height: 50,
                        width: "100%",
                      }}
                      dropdownTextStyles={styleTheme.textPrimary}
                      inputStyles={[
                        { marginLeft: -10 },
                        styleTheme.textPrimary,
                      ]}
                      fontFamily="Poppins_400Regular"
                      dropdownStyles={{
                        borderColor: styleTheme.textSecundary.color,
                      }}
                    />
                  </View>
                </View>

                <View style={styles.viewBotoes}>
                  <TouchableOpacity style={styles.botoes} onPress={goBack}>
                    <Text style={styles.textColor}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.botoes}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.textColor}>Editar</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
          <ConfirmarSenha
            mudarVisibilidade={toggle}
            visibilidade={modal}
            navigation={navigation}
            id_tecnico={dados.id_tecnico}
            image={image}
            dados={novosDados}
            senha={dados.senha}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
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
  labelError: {
    color: "#ff375b",
    marginTop: 5,
    fontSize: 14,
    alignSelf: "flex-start",
    fontFamily: "Poppins_400Regular",
  },
});
