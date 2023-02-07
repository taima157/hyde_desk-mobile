import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { api } from "../../services/api";
import CardChamados from "../../components/CardChamados";
import { useFonts, Poppins_600SemiBold } from "@expo-google-fonts/poppins";
import Header from "../../components/Header";

export default function Chamados() {
  const [chamados, setChamados] = useState([]);

  useEffect(() => {
    async function getChamados() {
      try {
        const response = await api.get("/chamados?status=pendente");

        setChamados(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    getChamados();
  }, []);

  let [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.viewTitulo}>
        <Text style={styles.titulo}>Chamados</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.viewChamados}>
          {chamados.length === 0 ? (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 200,
              }}
            >
              <ActivityIndicator size="large" color="#23AFFF" />
            </View>
          ) : (
            chamados?.map((chamado) => {
              return (
                <CardChamados key={chamado.id_chamado} chamado={chamado} />
              );
            })
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  viewTitulo: {
    width: "80%",
    paddingTop: 35,
    paddingBottom: 15,
    marginBottom: 10,
    paddingLeft: 50,
    paddingRight: 50,
    borderBottomColor: "#818181",
    borderBottomWidth: 1,
    alignItems: "center",
  },
  titulo: {
    fontSize: 26,
    fontFamily: "Poppins_600SemiBold",
  },
  viewChamados: {
    width: "100%",
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
  },
});
