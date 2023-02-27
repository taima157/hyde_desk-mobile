import { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import * as yup from "yup";
import { Formik } from "formik";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeContext } from "../../context/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function CadastroContato({ navigation }) {
  const { theme, styleTheme } = useContext(ThemeContext);

  async function handleSubmit(values) {
    const cadastroLocal = await AsyncStorage.getItem("cadastro");
    const cadastroParse = JSON.parse(cadastroLocal);

    await AsyncStorage.setItem(
      "cadastro",
      JSON.stringify({ ...cadastroParse, ...values })
    );
    navigation.navigate("CadastrarFoto");
  }

  const yupSchema = yup.object({
    email: yup.string().email("E-mail inválido").required("Digite seu e-mail"),
    telefone: yup
      .string()
      .min(11, "Telefone inválido")
      .required("Digite seu telefone"),
    senha: yup
      .string()
      .min(6, "A senha deve conter no mínimo 6 dígitos")
      .required("Digite sua senha"),
  });

  function voltar() {
    navigation.navigate("Cadastro");
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
      <View style={styles.containerTextCadastro}>
        <Text style={[styles.textCadastro, styleTheme.textPrimary]}>
          Cadastro
        </Text>
      </View>

      <Formik
        validationSchema={yupSchema}
        initialValues={{
          email: "",
          telefone: "",
          senha: "",
        }}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ handleChange, handleSubmit, values, errors, submitCount }) => (
          <>
            <View style={styles.containerInputs}>
              <TextInput
                onChangeText={handleChange("email")}
                value={values.email}
                keyboardType="email-address"
                style={[styles.inputs, styleTheme.inputPrimary]}
                placeholder="E-mail:"
                placeholderTextColor="#909090"
              />
              {errors.email && submitCount ? (
                <Text style={styles.labelError}>{errors.email}</Text>
              ) : null}

              <TextInput
                onChangeText={handleChange("telefone")}
                value={values.telefone}
                keyboardType="number-pad"
                style={[styles.inputs, styleTheme.inputPrimary]}
                placeholder="Telefone:"
                placeholderTextColor="#909090"
                maxLength={11}
              />

              {errors.telefone && submitCount ? (
                <Text style={styles.labelError}>{errors.telefone}</Text>
              ) : null}

              <TextInput
                onChangeText={handleChange("senha")}
                value={values.senha}
                style={[styles.inputs, styleTheme.inputPrimary]}
                placeholder="Senha:"
                placeholderTextColor="#909090"
                secureTextEntry={true}
                maxLength={11}
              />

              {errors.senha && submitCount ? (
                <Text style={styles.labelError}>{errors.senha}</Text>
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
          style={[
            styles.buttonBack,
            {
              backgroundColor:
                theme === "light"
                  ? "#000"
                  : styleTheme.containerSecundary.backgroundColor,
            },
          ]}
          onPress={voltar}
        >
          <MaterialCommunityIcons
            name="keyboard-backspace"
            size={40}
            color={theme === "light" ? "#FFF" : styleTheme.textPrimary.color}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default CadastroContato;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
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
