import { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { api } from "../../services/api";
import CardChamados from "../../components/CardChamados";
import {
  useFonts,
  Poppins_600SemiBold,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import { AuthContext } from "../../context/auth";

export default function Chamados({ navigation }) {
  const { user } = useContext(AuthContext);

  const [chamados, setChamados] = useState([]);
  const [chamadosAndamento, setChamadoAndamento] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  async function getChamados() {
    try {
      const response = await api.get("/chamados?status_chamado=pendente");

      setChamados(response.data);
      setRefreshing(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function getChamadosAndamento() {
    try {
      const response = await api.get(
        `/chamados?status_chamado=andamento&tecnico_id=${user.id_tecnico}`
      );

      setChamadoAndamento(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getChamados();
    getChamadosAndamento();

    navigation.addListener("focus", () => {
      getChamados();
      getChamadosAndamento();
    });

    navigation.addListener("blur", () => {
      setChamados([]);
      setChamadoAndamento(null);
    });
  }, [refreshing, navigation]);

  let [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
    Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.viewTitulo}>
        <Text style={styles.titulo}>Chamados</Text>
      </View>
      <View style={styles.viewChamados}>
        {chamadosAndamento === null ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="large" color="#23AFFF" />
          </View>
        ) : chamadosAndamento.length !== 0 ? (
          <View>
            <Text style={styles.textoChamadoAndamento}>
              Você já possui um chamado em andamento.
            </Text>
            <Text style={styles.textoChamadoAndamento}>
              Vá até a Home para mais detalhes.
            </Text>
          </View>
        ) : (
          <View style={styles.viewFlatList}>
            <FlatList
              style={styles.flatlist}
              data={chamados}
              renderItem={({ item }) => (
                <CardChamados
                  chamado={item}
                  setRefreshing={(e) => setRefreshing(e)}
                />
              )}
              keyExtractor={(item) => item.id_chamado}
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                setChamados([]);
              }}
            />
            {chamados.length === 0 ? (
              <View style={styles.viewSemChamados}>
                <Text style={styles.textoSemChamados}>
                  Não há chamados pendentes.
                </Text>
              </View>
            ) : null}
          </View>
        )}
      </View>
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
    justifyContent: "center",
    alignItems: "center",
  },
  textoChamadoAndamento: {
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
  viewFlatList: {
    position: "relative",
    width: "100%",
  },
  flatlist: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
    height: "100%",
  },
  viewSemChamados: {
    position: "absolute",
    top: "50%",
    left: "25%",
  },
  textoSemChamados: {
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
});
