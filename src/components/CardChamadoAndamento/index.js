import { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import { ThemeContext } from "../../context/theme";
import { ScrollView, View, Text, TouchableOpacity, Image } from "react-native";
import ModalImagem from "../ModalImagem";
import ConfirmModal from "../ConfirmModal";

export default function CardChamadoAndamento({
  chamado,
  toggleModalFinalizar,
  suspenderChamado,
}) {
  const { styleTheme } = useContext(ThemeContext);
  const [modalImage, setModalImage] = useState(false);
  const [modalCancelar, setModalCancelar] = useState(false);

  function toggleModalImage() {
    setModalImage(!modalImage);
  }

  function toggleModalCancelar() {
    setModalCancelar(!modalCancelar);
  }

  return (
    <View style={[styles.containerChamado, styleTheme.containerSecundary]}>
      <ScrollView>
        <Text style={[styles.nomeEmpresa, styleTheme.textPrimary]}>
          {chamado.nome_empresa}
        </Text>
        <View style={styles.field}>
          <Text style={[styles.label, styleTheme.textPrimary]}>Endereco:</Text>
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
          <Text style={[styles.label, styleTheme.textPrimary]}>Problema:</Text>
          <Text
            style={[
              styles.valorField,
              styleTheme.textPrimary,
              { textTransform: "capitalize" },
            ]}
          >
            {chamado.problema}
          </Text>
        </View>
        <View style={styles.field}>
          <Text style={[styles.label, styleTheme.textPrimary]}>Descrição:</Text>
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
            <ModalImagem
              isVisible={modalImage}
              close={toggleModalImage}
              url={`https://hdteste.azurewebsites.net/${chamado.anexo}`}
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
            Código de verificação:
          </Text>
          <Text style={[styles.valorField, styleTheme.textPrimary]}>
            {chamado.cod_verificacao}
          </Text>
        </View>
      </ScrollView>
      <View style={styles.botoesChamado}>
        <TouchableOpacity style={styles.botao} onPress={toggleModalCancelar}>
          <Text style={[styles.textoBotao, { color: "#23AFFF" }]}>
            Suspender
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.botao, { backgroundColor: "#23AFFF" }]}
          onPress={toggleModalFinalizar}
        >
          <Text style={[styles.textoBotao, { color: "#FFF" }]}>Finalizar</Text>
        </TouchableOpacity>
      </View>
      <ConfirmModal
        isVisible={modalCancelar}
        fecharModal={toggleModalCancelar}
        confirmarAcao={suspenderChamado}
        mensagem="Deseja suspender o atendimento desse chamado?"
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
