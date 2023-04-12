import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import { SelectList } from "react-native-dropdown-select-list";
import * as yup from "yup";
import { Formik } from "formik";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";
import { ThemeContext } from "../../context/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function Cadastro({ navigation }) {
  const { styleTheme } = useContext(ThemeContext);
  const data = [
    { key: "1", value: "Software" },
    { key: "2", value: "Infraestrutura" },
    { key: "3", value: "Hardware" },
  ];

  function validarCPF(cpf) {
    if (cpf === undefined) {
      return false;
    }

    cpf = cpf.replace(/[^\d]+/g, "");

    if (cpf.length !== 11) {
      return false;
    }

    if (/^(\d)\1{10}$/.test(cpf)) {
      return false;
    }

    var soma = 0;
    var resto;

    for (var i = 1; i <= 9; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
      resto = 0;
    }

    if (resto !== parseInt(cpf.substring(9, 10))) {
      return false;
    }

    soma = 0;

    for (i = 1; i <= 10; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
      resto = 0;
    }

    if (resto !== parseInt(cpf.substring(10, 11))) {
      return false;
    }

    return true;
  }

  const yupSchema = yup.object({
    nome: yup.string().required("Digite seu nome"),
    cpf: yup
      .string()
      .required("Informe seu CPF")
      .test("test-invalid-cpf", "CPF inválido", (cpf) => validarCPF(cpf)),
    especialidade: yup.string().required("Selecione uma especialidade"),
  });

  async function handleSubmit(values) {
    if (values.especialidade.length < 2) {
      values.especialidade = data[Number(values.especialidade) - 1].value;
    }

    await AsyncStorage.setItem("cadastro", JSON.stringify(values));

    navigation.navigate("CadastroContato");
  }

  function voltar() {
    navigation.navigate("Login");
  }

  let [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ScrollView style={styleTheme.container}>
      <View style={[styles.container, styleTheme.container]}>
        <View style={styles.containerTextCadastro}>
          <Text style={[styles.textCadastro, styleTheme.textPrimary]}>
            Cadastro
          </Text>
        </View>

        <Formik
          validationSchema={yupSchema}
          initialValues={{
            nome: "",
            cpf: "",
            especialidade: "",
          }}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ handleChange, handleSubmit, values, errors, submitCount }) => (
            <>
              <View style={styles.containerInputs}>
                <TextInput
                  style={[styles.inputs, styleTheme.inputPrimary]}
                  placeholder="Nome:"
                  onChangeText={handleChange("nome")}
                  value={values.nome}
                  placeholderTextColor={styleTheme.textSecundary.color}
                />

                {errors.nome && submitCount ? (
                  <Text style={styles.labelError}>{errors.nome}</Text>
                ) : null}

                <TextInput
                  keyboardType="numeric"
                  style={[styles.inputs, styleTheme.inputPrimary]}
                  placeholder="CPF:"
                  onChangeText={handleChange("cpf")}
                  value={values.cpf}
                  placeholderTextColor={styleTheme.textSecundary.color}
                  maxLength={11}
                />

                {errors.cpf && submitCount ? (
                  <Text style={styles.labelError}>{errors.cpf}</Text>
                ) : null}

                <View style={styles.containerSelectList}>
                  <SelectList
                    data={data}
                    value={values.especialidade}
                    setSelected={handleChange("especialidade")}
                    search={false}
                    placeholder="Selecione sua especialidade"
                    boxStyles={[
                      {
                        borderWidth: 2,
                        height: 50,
                      },
                      styleTheme.inputPrimary,
                    ]}
                    fontFamily="Poppins_400Regular"
                    inputStyles={{
                      color:
                        values.especialidade === ""
                          ? styleTheme.textSecundary.color
                          : styleTheme.textPrimary.color,
                      fontSize: 15,
                      marginLeft: -10,
                    }}
                    dropdownTextStyles={styleTheme.textPrimary}
                    dropdownStyles={{
                      borderColor: styleTheme.inputPrimary.borderColor,
                    }}
                  />
                </View>
                {errors.especialidade && submitCount ? (
                  <Text style={styles.labelError}>{errors.especialidade}</Text>
                ) : null}
              </View>

              <View style={styles.containerButtonNext}>
                <TouchableOpacity
                  style={[styles.buttonNext, styleTheme.buttonPress]}
                  onPress={handleSubmit}
                >
                  <Text style={[styles.textNext, styleTheme.buttonText]}>
                    Próximo
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>

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
    </ScrollView>
  );
}

export default Cadastro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingBottom: 20,
  },
  textCadastro: {
    fontSize: 36,
    fontFamily: "Poppins_700Bold",
  },
  containerTextCadastro: {
    marginTop: "30%",
    marginLeft: 15,
  },
  inputs: {
    height: 50,
    borderWidth: 2,
    marginTop: 15,
    padding: 10,
    borderRadius: 10,
    height: 50,
    width: "95%",
    color: "#000",
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
  },
  containerInputs: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
    marginTop: "8%",
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
    marginTop: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
  textNext: {
    color: "#fff",
    fontSize: 16,
    textTransform: "uppercase",
    fontFamily: "Poppins_700Bold",
  },
  buttonBack: {
    borderRadius: 50,
    width: 55,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
  },
  containerButtonBack: {
    marginTop: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
  containerSelectList: {
    width: "95%",
    marginTop: 15,
  },
  labelError: {
    color: "#ff375b",
    marginTop: 5,
    marginLeft: 20,
    fontSize: 14,
    alignSelf: "flex-start",
    fontFamily: "Poppins_400Regular",
  },
});
