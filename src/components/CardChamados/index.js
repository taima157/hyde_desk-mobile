import axios from "axios";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Image,
} from "react-native";
import { api } from "../../services/api";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import Modal from "react-native-modal";
import ImageViewer from "react-native-image-zoom-viewer";

export default function CardChamados({ chamado }) {
  const [empresa, setEmpresa] = useState([]);
  const [endereco, setEndereco] = useState([]);

  const dataHora = chamado.data.split("T");
  let data = dataHora[0];
  let hora = dataHora[1];
  data = data.split("-");
  const horaChamado = hora.split(".")[0];
  const dataChamado = `${data[2]}/${data[1]}/${data[0]}`;

  const [isModalVisible, setModalVisible] = useState(false);
  const [modalImage, setModalImage] = useState(false);

  function toggleModal() {
    setModalVisible(!isModalVisible);
  }

  function toggleModalImage() {
    setModalImage(!modalImage);
  }

  async function aceitarChamado() {
    try {
      const body = {
        status: "andamento",
        tecnico_id: 1
      }
      const response = await api.put(`/chamados/atualizar/${chamado.id_chamado}`, body)
      
      toggleModal()
    } catch(error) {
      console.log(error)
    }
  }

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

  console.log(empresa)
  console.log(chamado)

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={toggleModal}>
      <View style={styles.viewCardChamado}>
        {empresa.length === 0 ? (
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
      <Modal isVisible={isModalVisible} backdropOpacity={0.1}>
        <View style={styles.modalView}>
          <Text style={styles.tituloDetalhe}>Detalhes</Text>
          <ScrollView>
            <View style={styles.detalhesChamado}>
              <View style={styles.field}>
                <Text style={styles.label}>Empresa:</Text>
                <Text style={styles.valorField}>{empresa.nome}</Text>
              </View>
              <View style={styles.field}>
                <Text style={styles.label}>Data do chamado:</Text>
                <Text style={styles.valorField}>
                  {dataChamado} - {horaChamado}
                </Text>
              </View>
              <View style={styles.field}>
                <Text style={styles.label}>Problema:</Text>
                <Text
                  style={[styles.valorField, { textTransform: "capitalize" }]}
                >
                  {chamado.problema}
                </Text>
              </View>
              <View style={styles.field}>
                <Text style={styles.label}>Descrição:</Text>
                <Text style={styles.valorField}>{chamado.descricao}</Text>
              </View>
              {chamado.anexo !== null ? (
                <View style={styles.field}>
                  <Text style={styles.label}>Anexo:</Text>
                  <TouchableOpacity onPress={toggleModalImage}>
                    <Image
                      style={styles.anexo}
                      source={{
                        uri: `https://hydedeskteste.azurewebsites.net/${chamado.anexo}`,
                      }}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                  <Modal isVisible={modalImage} backdropOpacity={0.1}>
                    <ImageViewer
                      imageUrls={[
                        { url: `https://hydedeskteste.azurewebsites.net/${chamado.anexo}` },
                      ]}
                      enableImageZoom={true}
                      
                    />
                    <TouchableOpacity
                      style={styles.botaoModalImagem}
                      onPress={toggleModalImage}
                      activeOpacity={0.9}
                    >
                      <Text style={styles.textoBotaoModalImagem}>Fechar</Text>
                    </TouchableOpacity>
                  </Modal>
                </View>
              ) : null}
              <View style={styles.field}>
                <Text style={styles.label}>Setor:</Text>
                <Text style={styles.valorField}>{chamado.setor}</Text>
              </View>
              <View style={styles.field}>
                <Text style={styles.label}>Patrimônio:</Text>
                <Text style={styles.valorField}>{chamado.patrimonio}</Text>
              </View>
              <View style={styles.field}>
                <Text style={styles.label}>Código de verificação:</Text>
                <Text style={styles.valorField}>{chamado.cod_verificacao}</Text>
              </View>
            </View>
          </ScrollView>
          <View style={styles.botoesModal}>
            <TouchableOpacity
              onPress={toggleModal}
              style={[styles.botaoModal, { borderBottomLeftRadius: 20 }]}
            >
              <Text style={styles.textoBotao}>Voltar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={aceitarChamado}
              style={[styles.botaoModal, { borderBottomRightRadius: 20 }]}
            >
              <Text style={styles.textoBotao}>Aceitar</Text>
            </TouchableOpacity>
          </View>
        </View>
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
