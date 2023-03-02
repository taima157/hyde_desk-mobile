import { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from "react-native";
import { api } from "../../services/api";
import CardChamados from "../../components/CardChamados";
import {
  useFonts,
  Poppins_600SemiBold,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import { AuthContext } from "../../context/auth";
import { ThemeContext } from "../../context/theme";
import { SelectList } from "react-native-dropdown-select-list";

export default function Chamados({ navigation }) {
  const { user } = useContext(AuthContext);
  const { theme, styleTheme } = useContext(ThemeContext);
  const [prioridade, setPrioridade] = useState("1");

  const filtroItem = [
    { key: "1", value: "Tudo" },
    { key: "2", value: "Baixa" },
    { key: "3", value: "Média" },
    { key: "4", value: "Alta" },
  ];

  const [chamados, setChamados] = useState(null);
  const [chamadosAndamento, setChamadoAndamento] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  async function getChamados() {
    setChamados(null);
    setChamadoAndamento(null);
    try {
      let endpoint = "/chamados?status_chamado=pendente";
      let prioridadeTexto = filtroItem[Number(prioridade) - 1].value;

      if (prioridadeTexto !== "Tudo") {
        endpoint += `&prioridade=${prioridadeTexto}`;
      }

      const response = await api.get(endpoint);

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
      setRefreshing(false);
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
  }, [refreshing, navigation, prioridade]);

  let [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
    Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={[styles.container, styleTheme.container]}>
      <View style={styles.viewTitulo}>
        <Text style={[styles.titulo, styleTheme.textPrimary]}>Chamados</Text>
      </View>
      <View style={styles.viewFiltro}>
        <View style={styles.fieldFiltro}>
          <Text style={[styles.textPrioridade, styleTheme.textPrimary]}>
            Prioridade:
          </Text>
          <SelectList
            data={filtroItem}
            value={prioridade}
            setSelected={(e) => setPrioridade(e)}
            placeholder="Tudo"
            search={false}
            boxStyles={[
              {
                borderWidth: 2,
                borderColor: "#23AFFF",
                height: 50,
                width: 150,
              },
              styleTheme.containerSecundary,
            ]}
            fontFamily="Poppins_400Regular"
            inputStyles={{
              color: styleTheme.textPrimary.color,
              fontSize: 15,
              marginLeft: -10,
            }}
            dropdownStyles={{
              width: 150,
              position: "absolute",
              backgroundColor: styleTheme.containerSecundary.backgroundColor,
              zIndex: 10,
              top: 50,
              borderWidth: 2,
              borderColor: "#23AFFF",
            }}
            dropdownTextStyles={styleTheme.textPrimary}
          />
        </View>
      </View>

      <View style={styles.viewChamados}>
        {chamadosAndamento === null || chamados === null ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="large" color="#23AFFF" />
          </View>
        ) : chamadosAndamento?.length !== 0 ? (
          <View>
            <Text
              style={[styles.textoChamadoAndamento, styleTheme.textPrimary]}
            >
              Você já possui um chamado em andamento.
            </Text>
            <Text
              style={[styles.textoChamadoAndamento, styleTheme.textPrimary]}
            >
              Vá até a Home para mais detalhes.
            </Text>
          </View>
        ) : (
          <View style={styles.viewFlatList}>
            <ScrollView
              style={styles.flatlist}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={() => {
                    setRefreshing(true);
                  }}
                />
              }
            >
              {chamados.map((chamado) => {
                return (
                  <CardChamados
                    key={chamado.id_chamado}
                    chamado={chamado}
                    setRefreshing={(e) => setRefreshing(e)}
                  />
                );
              })}
            </ScrollView>
            {chamados.length === 0 ? (
              <View style={styles.viewSemChamados}>
                <Text style={[styles.textoSemChamados, styleTheme.textPrimary]}>
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
    left: "20%",
    width: "100%",
  },
  textoSemChamados: {
    fontFamily: "Poppins_400Regular",
  },
  viewFiltro: {
    width: "100%",
    paddingLeft: 20,
    paddingRight: 20,
    display: "flex",
    alignItems: "flex-end",
    paddingBottom: 5,
  },
  fieldFiltro: {
    display: "flex",
    flexDirection: "row",
  },
  textPrioridade: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    paddingRight: 5,
    marginTop: 10,
  },
});
