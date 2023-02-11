import axios from "axios";
import { useContext, useEffect, useState } from "react";
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
import Modal from "react-native-modal";
import ModalDetalhes from "../ModalDetalhes";
import { getDetalhesChamados } from "../../utils/getDetalhesChamados";
import { AuthContext } from "../../context/auth";

export default function CardChamados({ chamado, setRefreshing }) {
  const { user } = useContext(AuthContext);
  const [detalhesChamado, setDetalhesChamado] = useState([]);

  const [isModalVisible, setModalVisible] = useState(false);

  function toggleModal() {
    setModalVisible(!isModalVisible);
  }

  async function aceitarChamado() {
    try {
      const body = {
        status: "andamento",
        tecnico_id: user.id_tecnico,
      };

      const response = await api.put(
        `/chamados/atualizar/${chamado.id_chamado}`,
        body
      );

      toggleModal();
      setRefreshing(true);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function getDetalhes() {
      let detalhes = await getDetalhesChamados(chamado);

      setDetalhesChamado(detalhes);
    }

    getDetalhes();
  }, []);

  let [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
    Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={toggleModal}>
      <View style={styles.viewCardChamado}>
        {detalhesChamado.length === 0 ? (
          <View style={styles.activityStyle}>
            <ActivityIndicator size="large" color="#23AFFF" />
          </View>
        ) : (
          <>
            <Text style={styles.nomeEmpresa}>
              {detalhesChamado.empresa.nome}
            </Text>
            <View style={styles.enderecoData}>
              <View style={styles.endereco}>
                <MaterialCommunityIcons
                  name="map-marker-outline"
                  size={20}
                  color="black"
                />
                <Text style={styles.texto}>
                  {detalhesChamado.endereco.logradouro},{" "}
                  {detalhesChamado.empresa.numero_endereco}
                </Text>
              </View>
              <View style={styles.data}>
                <MaterialCommunityIcons
                  name="calendar-month"
                  size={20}
                  color="black"
                />
                <Text style={styles.texto}>{detalhesChamado.dataChamado}</Text>
              </View>
            </View>
            <View style={styles.problemaPrioridade}>
              <View style={styles.problema}>
                <MaterialCommunityIcons
                  name="desktop-classic"
                  size={20}
                  color="black"
                />
                <Text style={styles.texto}>{detalhesChamado.problema}</Text>
              </View>
              <View style={styles.prioridade}>
                <MaterialCommunityIcons
                  name="radiobox-marked"
                  size={20}
                  color="black"
                />
                <Text style={styles.texto}>
                  Prioridade {detalhesChamado.prioridade}
                </Text>
              </View>
            </View>
          </>
        )}
      </View>
      <Modal isVisible={isModalVisible} backdropOpacity={0.1}>
        <ModalDetalhes
          aceitarChamado={aceitarChamado}
          toggleModal={toggleModal}
          chamado={detalhesChamado}
        />
      </Modal>
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
  modalView: {
    flex: 1,
    backgroundColor: "#FFF",
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 5,
    marginRight: 5,
    elevation: 10,
    borderRadius: 20,
  },
  tituloDetalhe: {
    fontSize: 28,
    fontFamily: "Poppins_600SemiBold",
    padding: 10,
    textAlign: "center",
  },
  detalhesChamado: {
    padding: 10,
  },
  field: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
  },
  valorField: {
    width: "100%",
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
  },
  anexo: {
    width: "100%",
    height: 200,
    backgroundColor: "#000",
    marginTop: 5,
  },
  botaoModalImagem: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "#000",
  },
  textoBotaoModalImagem: {
    color: "#FFF",
    padding: 10,
    fontFamily: "Poppins_600SemiBold",
  },
  botoesModal: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  botaoModal: {
    width: "50%",
    display: "flex",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#23AFFF",
    padding: 5,
  },
  textoBotao: {
    fontWeight: "500",
    fontSize: 20,
    color: "#23AFFF",
  },
});
