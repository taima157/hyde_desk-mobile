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
import { getDetalhesChamados, sendNotification } from "../../utils";
import { AuthContext } from "../../context/auth";
import { ThemeContext } from "../../context/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CardChamados({ chamado, setRefreshing }) {
  const { user, successToast, errorToast } = useContext(AuthContext);
  const { theme, styleTheme } = useContext(ThemeContext);
  const [detalhesChamado, setDetalhesChamado] = useState([]);

  const [isModalVisible, setModalVisible] = useState(false);

  function toggleModal() {
    setModalVisible(!isModalVisible);
  }

  async function aceitarChamado() {
    try {
      const body = {
        tecnico_id: user.id_tecnico,
      };

      const response = await api.put(
        `/chamados/aceitar/${chamado.id_chamado}`,
        body
      );

      toggleModal();
      setRefreshing(true);
      successToast("Aceitar chamado", response.data.message);
      notificarAtraso(chamado.id_chamado);
    } catch (error) {
      errorToast("Aceitar chamado", error.response.data.message);
    }
  }

  async function notificarAtraso(id_chamado) {
    console.log(id_chamado);
    try {
      const response = await api.get(`/chamados/${id_chamado}`);

      const notifications = await AsyncStorage.getItem("notifications");

      const notificationJSON = JSON.parse(notifications);

      const trigger = new Date(Date.now() + 60 * 60 * 1000 * 48);
      // const trigger = 20;
      const idNotification = await sendNotification({
        title: "Notificação de chamado pendente",
        body: `Chamado ${response.data[0].cod_verificacao} pendente há mais de 2 dias. Conclua-o rapidamente para um melhor atendimento aos clientes.`,
        time: trigger,
      });

      notificationJSON.notificationAtraso = idNotification;
      await AsyncStorage.setItem(
        "notifications",
        JSON.stringify(notificationJSON)
      );
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

  console.log;

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={toggleModal}>
      <View style={[styles.viewCardChamado, styleTheme.containerSecundary]}>
        {detalhesChamado.length === 0 ? (
          <View style={styles.activityStyle}>
            <ActivityIndicator size="large" color="#23AFFF" />
          </View>
        ) : (
          <>
            <Text style={[styles.nomeEmpresa, styleTheme.textPrimary]}>
              {detalhesChamado.nome_empresa}
            </Text>
            <View style={styles.enderecoData}>
              <View style={styles.endereco}>
                <MaterialCommunityIcons
                  name="map-marker-outline"
                  size={20}
                  color={theme === "light" ? "#000" : "#cbd5e1"}
                />
                <Text style={[styles.texto, styleTheme.textPrimary]}>
                  {detalhesChamado.endereco.logradouro},{" "}
                  {detalhesChamado.numero_endereco}
                </Text>
              </View>
              <View style={styles.data}>
                <MaterialCommunityIcons
                  name="calendar-month"
                  size={20}
                  color={theme === "light" ? "#000" : "#cbd5e1"}
                />
                <Text style={[styles.texto, styleTheme.textPrimary]}>
                  {detalhesChamado.dataChamado}
                </Text>
              </View>
            </View>
            <View style={styles.problemaPrioridade}>
              <View style={styles.problema}>
                <MaterialCommunityIcons
                  name="desktop-classic"
                  size={20}
                  color={theme === "light" ? "#000" : "#cbd5e1"}
                />
                <Text style={[styles.texto, styleTheme.textPrimary]}>
                  {detalhesChamado.problema}
                </Text>
              </View>
              <View style={styles.prioridade}>
                <MaterialCommunityIcons
                  name="radiobox-marked"
                  size={20}
                  color={theme === "light" ? "#000" : "#cbd5e1"}
                />
                <Text style={[styles.texto, styleTheme.textPrimary]}>
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
