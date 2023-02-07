import axios from "axios";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { api } from "../../services/api";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";

export default function CardChamados({ chamado }) {
  const [empresa, setEmpresa] = useState([]);
  const [endereco, setEndereco] = useState([]);

  let data = chamado.data.slice(0, 10);
  data = data.split("-");
  const dataChamado = `${data[2]}/${data[1]}/${data[0]}`;

  console.log(dataChamado);

  useEffect(() => {
    async function getFuncionarioEmpresa() {
      try {
        const funcionario = await api.get(
          `/funcionarios/${chamado.funcionario_id}`
        );

        const empresa = await api.get(
          `/empresas/${funcionario.data.empresa_id}`
        );

        setEmpresa(empresa.data);

        const endereco = await axios.get(
          `https://viacep.com.br/ws/${empresa.data.cep}/json/`
        );
        setEndereco(endereco.data);
      } catch (error) {
        console.log(error);
      }
    }

    getFuncionarioEmpresa();
  }, []);

  let [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
    Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableOpacity activeOpacity={0.5}>
      <View style={styles.viewCardChamado}>
        {empresa.length === 0 || endereco.length === 0 ? (
          <View style={styles.activityStyle}>
            <ActivityIndicator size="large" color="#23AFFF" />
          </View>
        ) : (
          <>
            <Text style={styles.nomeEmpresa}>{empresa.nome}</Text>
            <View style={styles.enderecoData}>
              <View style={styles.endereco}>
                <MaterialCommunityIcons
                  name="map-marker-outline"
                  size={20}
                  color="black"
                />
                <Text style={styles.texto}>
                  {endereco.logradouro}, {empresa.numero_endereco}
                </Text>
              </View>
              <View style={styles.data}>
                <MaterialCommunityIcons
                  name="calendar-month"
                  size={20}
                  color="black"
                />
                <Text style={styles.texto}>{dataChamado}</Text>
              </View>
            </View>
            <View style={styles.problemaPrioridade}>
              <View style={styles.problema}>
                <MaterialCommunityIcons
                  name="desktop-classic"
                  size={20}
                  color="black"
                />
                <Text style={styles.texto}>{chamado.problema}</Text>
              </View>
              <View style={styles.prioridade}>
                <MaterialCommunityIcons
                  name="radiobox-marked"
                  size={20}
                  color="black"
                />
                <Text style={styles.texto}>
                  Prioridade {chamado.prioridade}
                </Text>
              </View>
            </View>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  viewCardChamado: {
    backgroundColor: "#FFF",
    width: "100%",
    borderColor: "#23AFFF",
    borderWidth: 2,
    borderRadius: 20,
    paddingTop: 10,
    paddingBottom: 25,
    alignItems: "center",
    marginBottom: 30,
    paddingLeft: 15,
    paddingRight: 15,
  },
  nomeEmpresa: {
    width: "85%",
    textAlign: "center",
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
  },
  enderecoData: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
  },
  endereco: {
    width: "50%",
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 15,
  },
  data: {
    width: "50%",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
  },
  problemaPrioridade: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
  },
  problema: {
    width: "50%",
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 10,
  },
  texto: {
    textTransform: "capitalize",
    paddingLeft: 5,
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
  },
  prioridade: {
    width: "50%",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
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
