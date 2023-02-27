import { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import Modal from "react-native-modal";
import ImageViewer from "react-native-image-zoom-viewer";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import { ThemeContext } from "../../context/theme";

export default function ModalDetalhes({
  chamado,
  aceitarChamado,
  toggleModal,
}) {
  const { theme, styleTheme } = useContext(ThemeContext);
  const [modalImage, setModalImage] = useState(false);

  function toggleModalImage() {
    setModalImage(!modalImage);
  }

  let [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
    Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={[styles.modalView, styleTheme.containerSecundary]}>
      <Text style={[styles.tituloDetalhe, styleTheme.textPrimary]}>
        Detalhes
      </Text>
      <ScrollView>
        <View style={styles.detalhesChamado}>
          <View style={styles.field}>
            <Text style={[styles.label, styleTheme.textPrimary]}>Empresa:</Text>
            <Text style={[styles.valorField, styleTheme.textPrimary]}>
              {chamado.nome_empresa}
            </Text>
          </View>
          <View style={styles.field}>
            <Text style={[styles.label, styleTheme.textPrimary]}>
              Endereco:
            </Text>
            <Text style={[styles.valorField, styleTheme.textPrimary]}>
              {chamado.endereco.logradouro}, {chamado.numero_endereco},{" "}
              {chamado.endereco.bairro}, {chamado.endereco.localidade} -{" "}
              {chamado.endereco.uf}
            </Text>
          </View>
          <View style={styles.field}>
            <Text style={[styles.label, styleTheme.textPrimary]}>Contato:</Text>
            <Text style={[styles.valorField, styleTheme.textPrimary]}>
              Tel: {chamado.telefone}
            </Text>
          </View>
          <View style={styles.field}>
            <Text style={[styles.label, styleTheme.textPrimary]}>
              Data do chamado:
            </Text>
            <Text style={[styles.valorField, styleTheme.textPrimary]}>
              {chamado.dataChamado} - {chamado.horaChamado}
            </Text>
          </View>
          <View style={styles.field}>
            <Text style={[styles.label, styleTheme.textPrimary]}>
              Problema:
            </Text>
            <Text
              style={[
                [styles.valorField, styleTheme.textPrimary],
                { textTransform: "capitalize" },
              ]}
            >
              {chamado.problema}
            </Text>
          </View>
          <View style={styles.field}>
            <Text style={[styles.label, styleTheme.textPrimary]}>
              Descrição:
            </Text>
            <Text style={[styles.valorField, styleTheme.textPrimary]}>
              {chamado.descricao}
            </Text>
          </View>
          {chamado.anexo !== null ? (
            <View style={styles.field}>
              <Text style={[styles.label, styleTheme.textPrimary]}>Anexo:</Text>
              <TouchableOpacity onPress={toggleModalImage}>
                <Image
                  style={styles.anexo}
                  source={{
                    uri: `https://hdteste.azurewebsites.net/${chamado.anexo}`,
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
                      url: `https://hdteste.azurewebsites.net/${chamado.anexo}`,
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
            <Text style={[styles.label, styleTheme.textPrimary]}>Setor:</Text>
            <Text style={[styles.valorField, styleTheme.textPrimary]}>
              {chamado.setor}
            </Text>
          </View>
          <View style={styles.field}>
            <Text style={[styles.label, styleTheme.textPrimary]}>
              Patrimônio:
            </Text>
            <Text style={[styles.valorField, styleTheme.textPrimary]}>
              {chamado.patrimonio}
            </Text>
          </View>
          <View style={styles.field}>
            <Text style={[styles.label, styleTheme.textPrimary]}>
              Código de verificação:
            </Text>
            <Text style={[styles.valorField, styleTheme.textPrimary]}>
              {chamado.cod_verificacao}
            </Text>
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
  );
}

const styles = StyleSheet.create({
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
