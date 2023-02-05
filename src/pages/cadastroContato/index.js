import { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import { useForm, Controller } from "react-hook-form";

const schema = yup.object({
  email: yup.string().email("E-mail inválido").required("Digite seu e-mail"),
  telefone: yup.string().min(11,"Telefone inválido").required("Digite seu telefone"),
  senha: yup.string().min(6,"A senha deve conter no mínimo 6 dígitos").required("Digite sua senha")
})

function CadastroContato({navigation}) {

  const {control, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(schema)
  });

  function validar(data) {
    console.log(data);
    navigation.navigate("CadastrarFoto", JSON.stringify(data))
  }

  function voltar(){
    navigation.navigate('Cadastro');
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerTextCadastro}>
        <Text style={styles.textCadastro}>Cadastro</Text>
      </View>

      <View style={styles.containerInputs}>
      <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextInput
            onChangeText={onChange}
            value={value}
            keyboardType="email-address"
            style={styles.inputs}
            placeholder="E-mail:"
            placeholderTextColor="#000000"
          ></TextInput>
          )}
        />
{errors.email && <Text style={styles.labelError}>{errors.email?.message}</Text>}
        <Controller
          control={control}
          name="telefone"
          render={({ field: { onChange, value } }) => (
            <TextInput
            onChangeText={onChange}
            value={value}
            keyboardType="number-pad"
            style={styles.inputs}
            placeholder="Telefone:"
            placeholderTextColor="#000000"
            maxLength={11}
          ></TextInput>
          )}
        />
{errors.telefone && <Text style={styles.labelError}>{errors.telefone?.message}</Text>}
         <Controller
          control={control}
          name="senha"
          render={({ field: { onChange, value } }) => (
            <TextInput
            onChangeText={onChange}
            value={value}
            style={styles.inputs}
            placeholder="Senha:"
            placeholderTextColor="#000000"
            secureTextEntry={true}
            maxLength={11} 
          ></TextInput>
          )}
        />
{errors.senha && <Text style={styles.labelError}>{errors.senha?.message}</Text>}
      </View>

      <View style={styles.containerButtonNext}>
        <TouchableOpacity style={styles.buttonNext} onPress={handleSubmit(validar)}>
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

export default CadastroContato;

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
    fontWeight: "bold",
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
    marginTop: "15%",
    justifyContent: "center",
    alignItems: "center",
  },
  containerSelectList: {
    width: "95%",
    marginTop: 15,
  },
  labelError: {
    color: '#ff375b',
    marginTop: 10,
    marginLeft: 20,
    fontSize: 16,
    alignSelf: 'flex-start',
  }
});
