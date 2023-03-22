import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useContext } from "react";
import { ThemeContext } from "../../context/theme";
import { useState } from "react";
import { api } from "../../services/api";
import { AuthContext } from "../../context/auth";
import ModalLoading from "../../components/ModalLoading";
import { Formik } from "formik";
import * as yup from "yup";

export default function RecuperarSenha({ navigation }) {
  const { successToast, errorToast } = useContext(AuthContext);
  const { styleTheme } = useContext(ThemeContext);
  const [loading, setLoading] = useState(false);

  const yupSchema = yup.object({
    email: yup
      .string()
      .email("E-mail inválido")
      .required("Digite um e-mail válido"),
  });

  function voltar() {
    navigation.navigate("Login");
  }

  async function handleSubmit(values) {
    setLoading(true);

    try {
      const form = {
        toemail: values.email,
        tipoTabela: "tecnicos",
      };

      const response = await api.post("/email", form);
      successToast("Recuperar senha", response.data.message);

      if (response.data.token) {
        const data = {
          email: values.email,
          token: response.data.token,
        };
        navigation.navigate("ConfirmarToken", data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      errorToast("Recuperar senha", "Não foi possível enviar E-mail.");
    }
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
      <View style={styles.container_login}>
        <Text style={[styles.login, styleTheme.textPrimary]}>
          Recuperar Senha
        </Text>
      </View>

      <View style={styles.container_TextoInput}>
        <Formik
          validationSchema={yupSchema}
          initialValues={{
            email: "",
          }}
          onSubmit={(values, { resetForm }) => {
            handleSubmit(values);
            resetForm({ values: "" });
          }}
        >
          {({ handleChange, handleSubmit, values, errors, submitCount }) => (
            <>
              <TextInput
                onChangeText={handleChange("email")}
                value={values.email}
                keyboardType="email-address"
                style={[styles.TextoInput, styleTheme.inputPrimary]}
                placeholder="E-mail"
                placeholderTextColor={styleTheme.textSecundary.color}
              />
              {errors.email && submitCount ? (
                <Text style={styles.labelError}>{errors.email}</Text>
              ) : null}

              <TouchableOpacity
                style={[styles.Botao, styleTheme.buttonPress]}
                onPress={handleSubmit}
              >
                <Text style={[styles.TextoBotao, styleTheme.buttonText]}>
                  Enviar Email
                </Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
        <View style={styles.containerTextoInfo}>
          <Text style={[styles.TextoInfo, styleTheme.textPrimary]}>
            Um link será enviado para que você possa redefinir sua senha.
          </Text>
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
      </View>
      <ModalLoading isVisible={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container_login: {
    marginTop: "40%",
    display: "flex",
    paddingBottom: "2%",
    paddingLeft: "1%",
  },
  login: {
    padding: "2%",
    fontSize: 36,
    fontFamily: "Poppins_700Bold",
  },
  container_TextoInput: {
    width: "100%",
    alignItems: "center",
  },
  TextoInput: {
    height: 50,
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
    height: 50,
    width: "95%",
    color: "#000",
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
  },
  TextoSenha: {
    width: "95%",
    height: 52,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderBottomColor: "#000",
    borderWidth: 2,
    padding: 15,
    marginTop: 10,
  },
  Botao: {
    backgroundColor: "#000",
    borderRadius: 10,
    width: "95%",
    height: 52,
    marginTop: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  TextoBotao: {
    color: "#fff",
    fontFamily: "Poppins_700Bold",
    textTransform: "uppercase",
  },
  containerTextoInfo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    top: 30,
  },
  TextoInfo: {
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    textAlign: "center",
  },
  buttonBack: {
    borderRadius: 50,
    width: 55,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
  },
  containerButtonBack: {
    marginTop: "15%",
    justifyContent: "center",
    alignItems: "center",
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
