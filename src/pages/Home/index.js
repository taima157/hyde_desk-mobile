import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { api } from "../../services/api";
import { getDetalhesChamados, cancelNotification } from "../../utils";
import { AuthContext } from "../../context/auth";
import CardChamadoAndamento from "../../components/CardChamadoAndamento";
import CardChamados from "../../components/CardChamados";
import { ThemeContext } from "../../context/theme";
import ModalLoading from "../../components/ModalLoading";
import ModalFinalizar from "../../components/ModalFinalizar";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home({ navigation }) {
  const { user, successToast, errorToast } = useContext(AuthContext);
  const { styleTheme } = useContext(ThemeContext);

  const [chamado, setChamado] = useState(null);
  const [chamadosConcluido, setChamadosConcluido] = useState(null);
  const [cancelar, setCancelar] = useState(false);

  const [loading, setLoading] = useState(false);

  const [modalCancelar, setModalCancelar] = useState(false);
  const [modalFinalizar, setModalFinalizar] = useState(false);

  function toggleModalCancelar() {
    setModalCancelar(!modalCancelar);
  }

  function toggleModalFinalizar() {
    setModalFinalizar(!modalFinalizar);
  }

  async function handleCancelNotification() {
    try {
      const notifications = await AsyncStorage.getItem("notifications");

      const notificationJSON = JSON.parse(notifications);

      await cancelNotification(notificationJSON.notificationAtraso);
    } catch (error) {
      console.log(error);
    }
  }

  async function suspenderChamado() {
    setLoading(true);

    try {
      const response = await api.put(
        `/chamados/suspender/${chamado.id_chamado}`
      );

      setChamado([]);
      setCancelar(!cancelar);
      toggleModalCancelar();

      setLoading(false);
      successToast("Suspender", response.data.message);
      handleCancelNotification();
    } catch (error) {
      setLoading(false);

      if (error.response.data.message) {
        errorToast("Suspender", error.response.data.message);
      }
    }
  }

  async function finalizarChamado(concluirChamado) {
    setLoading(true);

    const form = new FormData();
    form.append("descricao", concluirChamado.descricao);

    if (concluirChamado.anexo.uri !== "") {
      form.append("anexo", concluirChamado.anexo);
    }

    try {
      const response = await api.put(
        `/chamados/concluir/${chamado.id_chamado}`,
        form,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );

      toggleModalFinalizar();
      setLoading(false);
      successToast("Concluir chamado", response.data.message);

      setChamado([]);
      setCancelar(!cancelar);
      handleCancelNotification();
    } catch (error) {
      toggleModalFinalizar();
      errorToast("Concluir chamado", error.response.data.message);
    }
  }

  async function getChamadoAndamento() {
    setChamado(null);

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

  async function getChamadosConcluidos() {
    setChamadosConcluido(null);

    try {
      const response = await api.get(
        `/chamados?status_chamado=concluido&tecnico_id=${user.id_tecnico}`
      );

      if (response.data.length !== 0) {
        setChamadosConcluido(response.data.reverse());
      } else {
        setChamadosConcluido([]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    navigation.addListener("focus", () => {
      getChamadoAndamento();
      getChamadosConcluidos();
    });
  }, [navigation]);

  useEffect(() => {
    getChamadoAndamento();
    getChamadosConcluidos();
  }, [cancelar]);

  return (
    <View style={[styles.container, styleTheme.container]}>
      <View style={styles.viewTitulo}>
        <Text style={[styles.titulo, styleTheme.textPrimary]}>Home</Text>
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
            <Text style={[styles.tituloChamado, styleTheme.textPrimary]}>
              Chamado em andamento
            </Text>
            <CardChamadoAndamento
              chamado={chamado}
              suspenderChamado={suspenderChamado}
              toggleModalFinalizar={toggleModalFinalizar}
            />
          </>
        ) : (
          <>
            <Text style={[styles.tituloChamado, styleTheme.textPrimary]}>
              Últimos chamados concluídos
            </Text>
            {chamadosConcluido === null ? (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ActivityIndicator size="large" color="#23AFFF" />
              </View>
            ) : (
              <>
                {chamadosConcluido?.length !== 0 ? (
                  <ScrollView>
                    <View style={styles.containerChamadosConcluidos}>
                      {chamadosConcluido.map((chamado, index) => {
                        if (index < 5) {
                          return (
                            <CardChamados
                              key={chamado.id_chamado}
                              chamado={chamado}
                              estaConcluido={true}
                            />
                          );
                        }
                      })}
                    </View>
                  </ScrollView>
                ) : (
                  <View style={styles.viewSemConcluidos}>
                    <Text
                      style={[styles.textSemConcluidos, styleTheme.textPrimary]}
                    >
                      Você não possui chamados concluídos.
                    </Text>
                    <Text
                      style={[styles.textSemConcluidos, styleTheme.textPrimary]}
                    >
                      Vá até a tela de Chamados para aceitar um chamado
                      pendente.
                    </Text>
                  </View>
                )}
              </>
            )}
          </>
        )}
      </View>
      <ModalFinalizar
        isVisible={modalFinalizar}
        finalizarChamado={(e) => finalizarChamado(e)}
        toggleModalFinalizar={toggleModalFinalizar}
      />
      <ModalLoading isVisible={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
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
  containerChamadosConcluidos: {
    width: "100%",
    height: "87%",
    padding: 2,
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
  viewFinalizar: {
    borderRadius: 20,
    elevation: 10,
    alignItems: "center",
    padding: 15,
  },
  tituloFinalizar: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 20,
    marginBottom: 20,
  },
  viewDescricao: {
    width: "100%",
  },
  inputDescricao: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#23AFFF",
    height: 40,
    paddingLeft: 10,
    fontFamily: "Poppins_400Regular",
  },
  viewAnexo: {
    width: "100%",
    display: "flex",
    marginBottom: 20,
    alignItems: "center",
  },
  inputAnexo: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  botaoAnexo: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#23AFFF",
    borderRadius: 5,
  },
  textoBotaoAnexo: {
    fontFamily: "Poppins_400Regular",
    color: "#FFF",
  },
  imagemAnexo: {
    width: "70%",
    height: 130,
    backgroundColor: "#000",
    marginTop: 20,
  },
  botoesFinalizar: {
    marginTop: 20,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  erroDescricao: {
    fontFamily: "Poppins_700Bold",
    color: "red",
    textAlign: "center",
    padding: 10,
  },
  viewSemConcluidos: {
    flex: 1,
    width: "100%",
    alignItem: "center",
    justifyContent: "center",
  },
  textSemConcluidos: {
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
  },
});
