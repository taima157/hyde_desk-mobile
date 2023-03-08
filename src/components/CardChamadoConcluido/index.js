import { useContext, useEffect, useState } from "react";
import { getDetalhesChamados } from "../../utils/getDetalhesChamados";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemeContext } from "../../context/theme";

export default function CardChamadoConcluido({ chamado }) {
  const [detalhesChamado, setDetalhesChamado] = useState([]);
  const { styleTheme } = useContext(ThemeContext);

  useEffect(() => {
    async function getDetalheChamado() {
      let detalhes = await getDetalhesChamados(chamado);

      setDetalhesChamado(detalhes);
    }

    getDetalheChamado();
  });

  return (
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
                color={styleTheme.textPrimary.color}
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
                color={styleTheme.textPrimary.color}
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
                color={styleTheme.textPrimary.color}
              />
              <Text style={[styles.texto, styleTheme.textPrimary]}>
                {detalhesChamado.problema}
              </Text>
            </View>
            <View style={styles.prioridade}>
              <MaterialCommunityIcons
                name="radiobox-marked"
                size={20}
                color={styleTheme.textPrimary.color}
              />
              <Text style={[styles.texto, styleTheme.textPrimary]}>
                Prioridade {detalhesChamado.prioridade}
              </Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  viewCardChamado: {
    width: "100%",
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 25,
    alignItems: "center",
    marginBottom: 30,
    paddingLeft: 15,
    paddingRight: 15,
    elevation: 4,
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
