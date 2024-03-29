import { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { ThemeContext } from "../../context/theme";
import ModalImagem from "../ModalImagem";
import { API_URL } from "@env";
import { api } from "../../services/api";

export default function ModalDetalhes({
  chamado,
  aceitarChamado,
  toggleModal,
  estaConcluido,
}) {
  const { styleTheme } = useContext(ThemeContext);
  const [modalImage, setModalImage] = useState(false);
  const [conclusao, setConclusao] = useState(null);

  function toggleModalImage() {
    setModalImage(!modalImage);
  }

  useEffect(() => {
    async function getDetalhesConclusao() {
      if (estaConcluido) {
        const response = await api.get(
          `/conclusoes?chamado_id=${chamado.id_chamado}`
        );

        const dataTermino = await response.data[0].data_termino;

        const dataHora = dataTermino.split("T");
        let data = dataHora[0];
        let hora = dataHora[1];
        data = data.split("-");
        const horaChamado = hora.split(".")[0];
        const dataChamado = `${data[2]}/${data[1]}/${data[0]}`;

        setConclusao({ horaChamado, dataChamado });
      }
    }

    getDetalhesConclusao();
  }, []);

  return (
    <View style={[styles.modalView, styleTheme.containerSecundary]}>
      <Text style={[styles.tituloDetalhe, styleTheme.textPrimary]}>
        Detalhes
      </Text>
      <ScrollView>
        <View style={styles.detalhesChamado}>
          {estaConcluido && (
            <View style={styles.field}>
              <Text
                style={[
                  styles.label,
                  { textAlign: "center", color: "#00bb65" },
                ]}
              >
                Concluido
              </Text>
            </View>
          )}
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
              Data de abertura:
            </Text>
            <Text style={[styles.valorField, styleTheme.textPrimary]}>
              {chamado.dataChamado} - {chamado.horaChamado}
            </Text>
          </View>
          {conclusao !== null && (
            <View style={styles.field}>
              <Text style={[styles.label, styleTheme.textPrimary]}>
                Data de encerramento:
              </Text>
              <Text style={[styles.valorField, styleTheme.textPrimary]}>
                {conclusao.dataChamado} - {conclusao.horaChamado}
              </Text>
            </View>
          )}
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
                    uri: `${API_URL}` + chamado.anexo,
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <ModalImagem
                isVisible={modalImage}
                url={`${API_URL}` + chamado.anexo}
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
      {estaConcluido ? (
        <View style={styles.botoesModal}>
          <TouchableOpacity
            onPress={toggleModal}
            style={[
              styles.botaoModal,
              {
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                width: "100%",
              },
            ]}
          >
            <Text style={styles.textoBotao}>Voltar</Text>
          </TouchableOpacity>
        </View>
      ) : (
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
      )}
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
