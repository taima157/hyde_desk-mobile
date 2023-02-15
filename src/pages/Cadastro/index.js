import { useState } from "react";
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
import { SelectList } from "react-native-dropdown-select-list";
// import Header from "../../componentes/header";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

const schema = yup.object({
  nome: yup.string().required("Digite seu nome"),
  cpf: yup
    .string()
    .min(11, "CPF inválido")
    .max(11, "CPF inválido")
    .required("Informe seu CPF"),
});



function Cadastro({ navigation }) {

  // const [username, setUsername] = useState('')
  // const [cpf, setCpf] = useState('')
  const [selectedValue, setSelectedValue] = useState("");

  // function goBack() {
  //   navigation.navigate("Login")
  // }



  const data = [
    { key: "1", value: "Hardware" },
    { key: "2", value: "Rede" },
    { key: "3", value: "Sistema Operacional" },
    { key: "4", value: "Software" },
  ];

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function validar(data) {
    navigation.navigate("CadastroContato", data);
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
    <View style={styles.container}>
      {/* <Header /> */}
      <View style={styles.containerTextCadastro}>
        <Text style={styles.textCadastro}>Cadastro</Text>
      </View>

      <View style={styles.containerInputs}>
        <Controller
          control={control}
          name="nome"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.inputs}
              placeholder="Nome:"
              onChangeText={onChange}
              value={value}
              placeholderTextColor="#000000"
            ></TextInput>
          )}
        />
        {errors.nome && (
          <Text style={styles.labelError}>{errors.nome?.message}</Text>
        )}

        <Controller
          control={control}
          name="cpf"
          render={({ field: { onChange, value } }) => (
            <TextInput
              keyboardType="numeric"
              style={styles.inputs}
              placeholder="CPF:"
              onChangeText={onChange}
              value={value}
              placeholderTextColor="#000000"
              maxLength={11}
            ></TextInput>
          )}
        />
        {errors.cpf && (
          <Text style={styles.labelError}>{errors.cpf?.message}</Text>
        )}

        <View style={styles.containerSelectList}>
          <SelectList
            data={data}
            value={selectedValue}
            setSelected={setSelectedValue}
            placeholder="Selecione sua especialidade"
            boxStyles={{ borderWidth: 2, borderColor: "black", height: 50 }}
            inputStyles={{ color: "black", fontSize: 15, marginLeft: -10 }}
          />
        </View>
      </View>

      <View style={styles.containerButtonNext}>
        <TouchableOpacity
          style={styles.buttonNext}
          onPress={handleSubmit(validar)}
        >
          <Text style={styles.textNext}>Próximo</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.containerButtonBack}>
        <TouchableOpacity style={styles.buttonBack} onPress={voltar}>
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
    backgroundColor: "#FFF",
  },
  textCadastro: {
    fontSize: 36,
    fontFamily: 'Poppins_700Bold',
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
    fontFamily: 'Poppins_400Regular'
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
    fontFamily: 'Poppins_700Bold'
  },
  buttonBack: {
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    width: 40,
    height: 40,
    padding: 25,
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
    marginTop: 10,
    marginLeft: 20,
    fontSize: 16,
    alignSelf: "flex-start",
  },
});
