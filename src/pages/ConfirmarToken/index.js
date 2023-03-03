import { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ThemeContext } from "../../context/theme";
export default function ConfirmarToken({ route }) {
    const { styleTheme, toggleTheme } = useContext(ThemeContext);
  const token = route.params;
  const [tokenFormatado, setTokenFormatado] = useState([]);
  //   const inputValues = "      ";
  const [inputValues, setInputValues] = useState({
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
  });
  const [inputs, setInputs] = useState([]);

  tokenFormatado[0] === inputValues[0];

  console.log(token);
  console.log(inputValues);

  useEffect(() => {
    (function () {
      let tokenPre = [];

      for (let i in token) {
        tokenPre.push(token[i]);
      }

      setTokenFormatado(tokenPre);
    })();
  }, []);

  return (
    <View  style={[styles.view,styleTheme.container]}>
      <Text>Verificar Token</Text>
      <View style={styles.viewInput}>
      {tokenFormatado?.map((item, index) => {
        return (
          <TextInput
            key={index}
            style={[styles.input, styleTheme.inputPrimary]}
            value={inputValues[index]}
            placeholder="*"
            placeholderTextColor={styleTheme.textSecundary.color}
            onChangeText={(e) => setInputValues({ ...inputValues, [index]: e })}
            maxLength={1}
            autoFocus={inputValues[index] === "" ? true : false}
            keyboardType="numeric"
          />
        );
      })}
      </View>
      
      <TouchableOpacity
     
        onPress={() => {
          let tokenCompare = "";
          Object.keys(inputValues).map((key) => {
            tokenCompare += inputValues[key];
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
    view:{
        height: "100%",
    },
    input: {
        width: "10%",
        borderWidth: 2,
        borderRadius: 5,
        textAlign: 'center',

    },
    viewInput: {
        width: "100%",
        flexDirection: "row",
        justifyContent: 'space-around'
    }
})