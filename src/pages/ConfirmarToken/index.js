import { useEffect, useState, useContext, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ThemeContext } from "../../context/theme";
import {
  Poppins_400Regular,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";

export default function ConfirmarToken({ route }) {
  const { styleTheme, toggleTheme } = useContext(ThemeContext);

  const token = route.params;
  const [inputValues, setInputValues] = useState([
    { value: "", ref: useRef(null) },
    { value: "", ref: useRef(null) },
    { value: "", ref: useRef(null) },
    { value: "", ref: useRef(null) },
    { value: "", ref: useRef(null) },
    { value: "", ref: useRef(null) },
  ]);

  let [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={[styles.container, styleTheme.container]}>
      <Text>Verificar Token</Text>
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

      <TouchableOpacity
        onPress={() => {
          let tokenCompare = "";
          inputValues.forEach((item) => {
            tokenCompare += item.value;
          });

          console.log(tokenCompare);
        }}
      >
        <Text>Comparar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
