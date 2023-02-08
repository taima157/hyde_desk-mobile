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
import { useFonts, Poppins_600SemiBold, Poppins_400Regular } from "@expo-google-fonts/poppins";

export default function Chamados() {
  const [chamados, setChamados] = useState([]);
  const [chamadosAndamento, setChamadoAndamento] = useState(false);

  useEffect(() => {
    async function getChamados() {
      try {
        const response = await api.get("/chamados?status=pendente");

        setChamados(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    async function getChamadosAndamento() {
      try {
        const response = await api.get(
          `/chamados?status=andamento&tecnico_id=${1}`
        );

        if (response.data.length > 0) {
          setChamadoAndamento(true);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getChamados();
    getChamadosAndamento();
  }, []);

  let [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
    Poppins_400Regular
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
          {chamadosAndamento ? (
            <Text style={styles.textoChamadoAndamento}>Você já possui um chamado em andamento.</Text>
          ) : chamados.length === 0 ? (
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
    flex: 1,
    width: "100%",
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  textoChamadoAndamento: {
    fontFamily: "Poppins_400Regular"
  }
});
