import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";

import { api } from "../../services/api";
import { useEffect, useState } from "react";

function Perfil({ navigation }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getToken() {
      try {
        const storageToken = await AsyncStorage.getItem("user");

        if (storageToken !== null) {
          const tokenTecnico = JSON.parse(storageToken);
          const tecnico = jwtDecode(tokenTecnico[0]);

          try{
            const response = await api.get(`/tecnicos/${tecnico.id_tecnico}`);
            setData(response.data);
          }
          catch(error){
            console.log(error)
          }

        }
      } catch (e) {
        console.log(e);
      }
    }

    getToken();
  }, []);

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  function goToEditar() {
    navigation.navigate("Editar Perfil", data);
  }

  return (
    <View style={{ backgroundColor: "#fff", height: "100%" }}>
      {data.length === 0 ? (
        <View style={styles.activityStyle}>
          <ActivityIndicator size="large" color="#23AFFF" />
        </View>
      ) : (
        <>
          {data.foto != undefined ? (
            <View style={styles.viewImage}>
              <Image
                style={{ width: 150, height: 150, borderRadius: 75 }}
                source={{ uri: `http://192.168.15.10:4001/${data.foto}` }}
              />
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
              <Text style={styles.textDados}>
                Especialidade: {data.especialidade}
              </Text>
              <Text style={styles.textDados}>CPF: {data.cpf}</Text>
              <Text style={styles.textDados}>Telefone: {data.telefone}</Text>
            </View>
          </View>
        </>
      )}
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
