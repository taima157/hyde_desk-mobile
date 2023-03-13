import { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import { ThemeContext } from "../../context/theme";
import ModalImagem from "../ModalImagem";
import { API_URL } from "@env";

export default function ModalDetalhes({
  chamado,
  aceitarChamado,
  toggleModal,
}) {
  const { styleTheme } = useContext(ThemeContext);
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
                    uri: API_URL + chamado.anexo,
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <ModalImagem
                isVisible={modalImage}
                url={API_URL + chamado.anexo}
                close={toggleModalImage}
              />
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
              Protocolo:
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
