import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import {
  useFonts,
  Poppins_600SemiBold,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import { useContext, useEffect, useState } from "react";
import { api } from "../../services/api";
import { getDetalhesChamados } from "../../utils/getDetalhesChamados";
import Modal from "react-native-modal";
import ImageViewer from "react-native-image-zoom-viewer";
import { AuthContext } from "../../context/auth";

export default function Home({ navigation }) {
  const { user } = useContext(AuthContext);
  const [chamado, setChamado] = useState(null);
  const [cancelar, setCancelar] = useState(false);

  const [modalImage, setModalImage] = useState(false);

  function toggleModalImage() {
    setModalImage(!modalImage);
  }

  async function cancelarChamado() {
    try {
      const body = {
        status: "pendente",
        tecnico_id: "NULL",
      };
      const response = api.put(
        `/chamados/atualizar/${chamado.id_chamado}`,
        body
      );

      setChamado(null);
      setCancelar(!cancelar);
    } catch (error) {
      console.log(error);
    }
  }

  async function getChamadoAndamento() {
    try {
      const response = await api.get(
        `/chamados?status_chamado=andamento&tecnico_id=${user.id_tecnico}`
      );

      if (response.data.length !== 0) {
        let detalhes = await getDetalhesChamados(response.data[0]);
        setChamado(detalhes);
      } else {
        setChamado([]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getChamadoAndamento();

    navigation.addListener("focus", () => {
      getChamadoAndamento();
    });

    navigation.addListener("blur", () => {
      setChamado(null);
    });
  }, [navigation, cancelar]);

  let [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
    Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  console.log(chamado);

  return (
    <View style={styles.container}>
      <View style={styles.viewTitulo}>
        <Text style={styles.titulo}>Home</Text>
      </View>
      <View style={styles.viewChamado}>
        {chamado === null ? (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <ActivityIndicator size="large" color="#23AFFF" />
          </View>
        ) : chamado.length !== 0 ? (
          <>
            <Text style={styles.tituloChamado}>Chamado em andamento</Text>
            <View style={styles.containerChamado}>
              <ScrollView>
                <Text style={styles.nomeEmpresa}>{chamado.empresa.nome}</Text>
                <View style={styles.field}>
                  <Text style={styles.label}>Endereco:</Text>
                  <Text style={styles.valorField}>
                    {chamado.endereco.logradouro},{" "}
                    {chamado.empresa.numero_endereco}, {chamado.endereco.bairro}
                    , {chamado.endereco.localidade} - {chamado.endereco.uf}
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
                          uri: `https://hydedeskteste.azurewebsites.net/${chamado.anexo}`,
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
                            url: `https://hydedeskteste.azurewebsites.net/${chamado.anexo}`,
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
                  <Text style={styles.valorField}>
                    {chamado.cod_verificacao}
                  </Text>
                </View>
              </ScrollView>
              <View style={styles.botoesChamado}>
                <TouchableOpacity
                  style={styles.botao}
                  onPress={cancelarChamado}
                >
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
          </>
        ) : (
          <>
            <Text style={styles.tituloChamado}>
              Últimos chamados concluídos
            </Text>
            <View style={styles.containerChamado}></View>
          </>
        )}
      </View>
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
