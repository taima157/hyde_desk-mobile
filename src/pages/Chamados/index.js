import { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { api } from "../../services/api";
import CardChamados from "../../components/CardChamados";

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

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.viewTitulo}>
          <Text style={styles.titulo}>Chamados</Text>
        </View>
        <View style={styles.viewChamados}>
          {chamados?.map((chamado) => {
            return <CardChamados key={chamado.id_chamado} chamado={chamado} />;
          })}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    padding: 30,
  },
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  viewTitulo: {
    width: "95%",
    paddingBottom: 15,
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    alignItems: "center",
  },
  titulo: {
    fontSize: 26,
  },
  viewChamados: {
    width: "100%",
    paddingTop: 50,
  },
});
