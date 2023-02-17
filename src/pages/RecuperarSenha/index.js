import { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";

export default function Login({ navigation }) {
  
  let [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }


  return (
    <View style={styles.container}>
      <View style={styles.container_login}>
        <Text style={styles.login}>Recuperar Senha</Text>
      </View>

      <View style={styles.container_TextoInput}>
        <TextInput
          style={styles.TextoInput}
          placeholder="E-mail"
          placeholderTextColor="#909090"
          keyboardType="email-address"
        />
  
        <TouchableOpacity style={styles.Botao} onPress={() => ""}>
          <Text style={styles.TextoBotao}>Enviar Email</Text>
        </TouchableOpacity>

        <View  style={styles.containerTextoInfo}>
          <Text style={styles.TextoInfo}>Um link sera enviado para que você possa redefinir sua senha.</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },

  container_login: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
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
    width: "95%",
    height: 52,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderBottomColor: "#000",
    borderWidth: 2,
    padding: 15,
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
    fontFamily: "Poppins_400Regular",
  },

  containerTextoInfo:{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    top: 30
  },

  TextoInfo: {
    fontFamily: "Poppins_400Regular",
    fontSize: 17,
  },
});