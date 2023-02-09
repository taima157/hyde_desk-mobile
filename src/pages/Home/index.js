import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import {
  useFonts,
  Poppins_600SemiBold,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { decodeToken } from "react-jwt";
import { api } from "../../services/api";
import { getDetalhesChamados } from "../../middlewares/getDetalhesChamados";
import Modal from "react-native-modal";
import ImageViewer from "react-native-image-zoom-viewer";

export default function Home() {
  const [chamado, setChamado] = useState([]);

  const [modalImage, setModalImage] = useState(false);

  function toggleModalImage() {
    setModalImage(!modalImage);
  }

  useEffect(() => {
    async function getChamadoAndamento() {
      try {
        const tokenLocal = await AsyncStorage.getItem("user");
        const tokenLocalParse = await JSON.parse(tokenLocal)[0];

        const tokenDecode = decodeToken(tokenLocalParse);

        const response = await api.get(
          `/chamados?status_chamado=andamento&tecnico_id=${tokenDecode.id_tecnico}`
        );

        if (response.data.length > 0) {
          let detalhes = await getDetalhesChamados(response.data[0]);

          setChamado(detalhes);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getChamadoAndamento();
  }, []);

  console.log(chamado);

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
        <Text style={styles.titulo}>Home</Text>
      </View>
      {chamado.length !== 0 ? (
        <View style={styles.viewChamado}>
          <Text style={styles.tituloChamado}>Chamado em andamento</Text>
          <View style={styles.containerChamado}>
            <ScrollView>
              <Text style={styles.nomeEmpresa}>{chamado.empresa.nome}</Text>
              <View style={styles.field}>
                <Text style={styles.label}>Endereco:</Text>
                <Text style={styles.valorField}>
                  {chamado.endereco.logradouro},{" "}
                  {chamado.empresa.numero_endereco}, {chamado.endereco.bairro},{" "}
                  {chamado.endereco.localidade} - {chamado.endereco.uf}
                </Text>
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>Contato:</Text>
                <Text style={styles.valorField}>
                  Tel: {chamado.empresa.telefone}
                </Text>
              </View>
              <View style={styles.field}>
                <Text style={styles.label}>Data do chamado:</Text>
                <Text style={styles.valorField}>
                  {chamado.dataChamado} - {chamado.horaChamado}
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
                        uri: `http://192.168.1.191:4001/${chamado.anexo}`,
                      }}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                  <Modal
                    isVisible={modalImage}
                    backdropOpacity={0.1}
                    style={{ width: "100%", margin: 0, height: "100%" }}
                  >
                    <ImageViewer
                      imageUrls={[
                        {
                          url: `http://192.168.1.191:4001/${chamado.anexo}`,
                        },
                      ]}
                      saveToLocalByLongPress={false}
                    />
                    <TouchableOpacity
                      style={styles.botaoModalImagem}
                      onPress={toggleModalImage}
                      activeOpacity={0.9}
                    >
                      <Text style={styles.textoBotaoModalImagem}>Fechar</Text>
                    </TouchableOpacity>
                    <StatusBar
                      barStyle="default"
                      backgroundColor="#000"
                      animated={true}
                    />
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
            </ScrollView>
            <View style={styles.botoesChamado}>
              <TouchableOpacity style={styles.botao}>
                <Text style={[styles.textoBotao, { color: "#23AFFF" }]}>
                  Cancelar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.botao, { backgroundColor: "#23AFFF" }]}
              >
                <Text style={[styles.textoBotao, { color: "#FFF" }]}>
                  Finalizar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.viewChamado}>
          <Text style={styles.tituloChamado}>Últimos chamados concluídos</Text>
          <View style={styles.containerChamado}></View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
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
  viewChamado: {
    flex: 1,
    width: "100%",
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 5,
  },
  tituloChamado: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    textAlign: "left",
    marginBottom: 15,
  },
  containerChamado: {
    width: "100%",
    height: "87%",
    padding: 10,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "#23AFFF",
  },
  nomeEmpresa: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    width: "100%",
    textAlign: "center",
    marginBottom: 10,
  },
  field: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
  },
  valorField: {
    width: "100%",
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
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
  botoesChamado: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  botao: {
    width: "45%",
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "#23AFFF",
    padding: 6,
  },
  textoBotao: {
    textAlign: "center",
    fontFamily: "Poppins_600SemiBold",
  },
});