import { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import Header from "../../componentes/header";



function Cadastro() {
  const data = [
    { key: "1", value: "Hardware" },
    { key: "2", value: "Rede" },
    { key: "3", value: "Sistema Operacional" },
  ];

  const [selectedValue, setSelectedValue] = useState("");
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.containerTextCadastro}>
        <Text style={styles.textCadastro}>Cadastro</Text>
      </View>

      <View style={styles.containerInputs}>
        <TextInput
          style={styles.inputs}
          placeholder="Nome:"
          placeholderTextColor="#000000"
        ></TextInput>
        <TextInput
          keyboardType="numeric"
          style={styles.inputs}
          placeholder="CPF:"
          placeholderTextColor="#000000"
          maxLength={11}
        ></TextInput>

        <View style={styles.containerSelectList}>
          <SelectList
            data={data}
            setSelected={setSelectedValue}
            placeholder="Selecione sua especialidade"
            boxStyles={{borderWidth: 2, borderColor: 'black', height: 50}}
            inputStyles={{color:'black', fontSize: 15,}}
          />
        </View>
      </View>

      <View style={styles.containerButtonNext}>
        <TouchableOpacity style={styles.buttonNext}>
          <Text style={styles.textNext}>Próximo</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.containerButtonBack}>
        <TouchableOpacity style={styles.buttonBack}>
          <Image source={require("../../../assets/arrow.png")} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Cadastro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textCadastro: {
    fontWeight: "bold",
    fontSize: 36,
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
  },
  containerInputs: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
    marginTop: 41,
  },
  picker: {
    height: 40,
    width: 350,
    marginTop: 15,
    color: "#000000",
    fontSize: 15,
    width: "95%",
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
    marginTop: 46,
    justifyContent: "center",
    alignItems: "center",
  },
  textNext: {
    color: "#fff",
    fontSize: 16,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  buttonBack: {
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 50,
    width: 40,
    height: 40,
    padding: 25,
  },
  containerButtonBack: {
    marginTop: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  containerSelectList: {
    width: "95%",
    margin: 15,
  },
});
