import { View, Image, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";

import jwtDecode from "jwt-decode";

import { api } from "../../services/api";
import { useEffect, useState } from "react";

function Perfil({ route, navigation }) {

  

  const { dataTecnico } = route.params
  const [data, setData] = useState([])

  // console.log(dataTecnico)

  const tecnico = jwtDecode(dataTecnico.token)

  // console.log(id_tecnico)
  useEffect(() => {
    async function getPerfil() {
      const response = await api.get(`/tecnicos/${tecnico.id_tecnico}`)

      setData(response.data)
      console.log(data)
      console.log(data.foto)
    }

    getPerfil()
  }, [])

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  function goToEditar(){
    navigation.navigate("Editar Perfil", data)
  }
  return (
    <View style={{ backgroundColor: "#fff", height: "100%" }}>

      {data.length === 0 ? (
        <View style={styles.activityStyle}>
          <ActivityIndicator size="large" color="#23AFFF" />
        </View>) : (
        <>
          {data.foto != undefined ? (
            <View style={styles.viewImage}>
              <Image style={{ width: 50, height: 50 }} source={{ uri: `http://10.105.72.142:4001/${data.foto}`}} />
            </View>
          ) : (
            <View style={styles.activityStyle}>
              <ActivityIndicator size="large" color="#23AFFF" />
            </View>
          )}

          <View style={styles.viewText}>
            <Text>{data.nome}</Text>
            <Text style={styles.bold}>{data.email}</Text>

            <TouchableOpacity style={styles.editar} onPress={goToEditar}>
              <Text style={styles.textStyle}>Editar Perfil</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.viewDados}>
            <Text>Meus Dados</Text>

            <View style={styles.viewDados2}>
              <Text style={styles.textDados}>Matricula: {data.matricula}</Text>
              <Text style={styles.textDados}>Especialidade: {data.especialidade}</Text>
              <Text style={styles.textDados}>CPF: {data.cpf}</Text>
              <Text style={styles.textDados}>Telefone: {data.telefone}</Text>
            </View>
          </View>
        </>)}

    </View>
  );
}

const styles = StyleSheet.create({
  viewImage: {
    width: "100%",
    alignItems: "center",
    marginTop: 50,
  },
  viewText: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  editar: {
    backgroundColor: "#23AFFF",
    width: 200,
    alignItems: "center",
    padding: 10,
    borderRadius: 30,
    marginTop: 20,
  },
  textStyle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  viewDados: {
    marginTop: 60,
    padding: 20,
  },
  viewDados2: {
    width: "100%",
    marginTop: 15,
  },
  textDados: {
    color: "#a8a7a7",
    borderBottomColor: "#a8a7a7",
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  activityStyle: {
    paddingTop: 15,
    paddingLeft: 50,
    paddingRight: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Perfil;
