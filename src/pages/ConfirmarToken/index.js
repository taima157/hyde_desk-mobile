import { useState, useContext, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ThemeContext } from "../../context/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ConfirmarToken({ route, navigation }) {
  const { theme, styleTheme } = useContext(ThemeContext);
  const [aviso, setAviso] = useState(false);

  const data = route.params;

  const [inputValues, setInputValues] = useState([
    { value: "", ref: useRef(null) },
    { value: "", ref: useRef(null) },
    { value: "", ref: useRef(null) },
    { value: "", ref: useRef(null) },
    { value: "", ref: useRef(null) },
    { value: "", ref: useRef(null) },
  ]);

  function voltar() {
    navigation.navigate("Recuperar Senha");
  }

  async function comparar() {
    let tokenCompare = "";
    inputValues.forEach((item) => {
      tokenCompare += item.value;
    });

    if (tokenCompare === data.token) {
      navigation.navigate("TrocarSenha", data.email);
    } else {
      setAviso(true);
    }
  }

  return (
    <View style={[styles.container, styleTheme.container]}>
      <View style={styles.viewAlign}>
        <Text style={[styles.textToken, styleTheme.textPrimary]}>
          Verificar Token
        </Text>
        <View style={styles.viewInput}>
          {inputValues.map((input, index) => {
            return (
              <TextInput
                key={index}
                ref={input.ref}
                style={[styles.input, styleTheme.inputPrimary]}
                value={input.value}
                placeholder="*"
                placeholderTextColor={styleTheme.textSecundary.color}
                onChangeText={(e) => {
                  setInputValues(
                    inputValues.map((item, indexInput) => {
                      if (indexInput === index) {
                        return { ...item, value: e };
                      } else {
                        return item;
                      }
                    })
                  );

                  if (e !== "") {
                    let position = index + 1;

                    if (position < inputValues.length) {
                      inputValues[position].ref.current.focus();
                    }
                  }
                }}
                onKeyPress={({ nativeEvent: { key: keyValue } }) => {
                  if (inputValues[index].value === "") {
                    if (keyValue === "Backspace") {
                      let position = index - 1;
                      if (position >= 0) {
                        inputValues[position].ref.current.focus();
                      }
                    }
                  }
                }}
                maxLength={1}
                keyboardType="numeric"
              />
            );
          })}
        </View>
        <View style={styles.viewBotao}>
          <TouchableOpacity
            style={[styles.Botao, styleTheme.buttonPress]}
            onPress={comparar}
          >
            <Text style={[styles.TextoBotao, styleTheme.buttonText]}>
              Verficar
            </Text>
          </TouchableOpacity>
          {aviso ? (
            <Text style={styles.tokenInvalido}>Token inválido</Text>
          ) : null}
        </View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "#fff",
  },
  viewAlign: {
    marginTop: "40%",
  },
  textToken: {
    padding: "2%",
    fontSize: 36,
    fontFamily: "Poppins_700Bold",
  },
  input: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderRadius: 5,
    textAlign: "center",
    fontSize: 20,
    fontFamily: "Poppins_400Regular",
  },
  viewInput: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  tokenInvalido: {
    fontFamily: "Poppins_600SemiBold",
    color: "red",
    fontSize: 15,
    marginTop: 20,
  },
  containerButtonBack: {
    marginTop: "15%",
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
  containerButtonBack: {
    marginTop: "15%",
    justifyContent: "center",
    alignItems: "center",
  },
  Botao: {
    backgroundColor: "#000",
    borderRadius: 10,
    width: "95%",
    height: 52,
    marginTop: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  TextoBotao: {
    color: "#fff",
    fontFamily: "Poppins_700Bold",
    textTransform: "uppercase",
  },
  viewBotao: {
    width: "100%",
    alignItems: "center",
  },
});
