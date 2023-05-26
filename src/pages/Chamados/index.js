import { useContext, useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { api } from "../../services/api";
import CardChamados from "../../components/CardChamados";
import { AuthContext } from "../../context/auth";
import { ThemeContext } from "../../context/theme";
import { SelectList } from "react-native-dropdown-select-list";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PaginationButton from "../../components/PaginationButton";

export default function Chamados({ navigation }) {
  const { user, errorToast, canBack, setCanBack } = useContext(AuthContext);
  const { styleTheme } = useContext(ThemeContext);
  const [prioridade, setPrioridade] = useState("1");

  const scrollRef = useRef(null);

  const filtroItem = [
    { key: "1", value: "Tudo" },
    { key: "2", value: "Baixa" },
    { key: "3", value: "Média" },
    { key: "4", value: "Alta" },
  ];

  const [chamados, setChamados] = useState([]);
  const [chamadosAndamento, setChamadoAndamento] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  async function getChamados() {
    setChamados(null);
    try {
      let endpoint = "/chamados?status_chamado=pendente";
      let prioridadeTexto = filtroItem[Number(prioridade) - 1].value;

      if (prioridadeTexto !== "Tudo") {
        endpoint += `&prioridade=${prioridadeTexto}`;
      }

      const response = await api.get(endpoint);

      setChamados(response.data);
      setRefreshing(false);
    } catch (error) {
      errorToast("Erro", "Houve um erro.");
    }
  }

  async function getChamadosAndamento() {
    setChamadoAndamento(null);
    try {
      const response = await api.get(
        `/chamados?status_chamado=andamento&tecnico_id=${user.id_tecnico}`
      );

      setChamadoAndamento(response.data);
      setRefreshing(false);
    } catch (error) {
      errorToast("Erro", "Houve um erro.");
    }
  }

  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [paginationButtons, setPaginationButtons] = useState(null);

  function genPagination(from, to) {
    setPagination(
      chamados?.map((chamado, index) => {
        if (index >= from && index < to) {
          return (
            <CardChamados
              key={chamado.id_chamado}
              chamado={chamado}
              setRefreshing={(e) => setRefreshing(e)}
            />
          );
        }
      })
    );
  }

  function handleChangePage(index) {
    changePage(index);
    setCurrentPage(index);
  }

  function changePage(numberPage) {
    const { from, to } = paginationButtons[numberPage];
    genPagination(from, to);
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  }

  function prevPage() {
    if (currentPage - 1 >= 0) {
      changePage(currentPage - 1);
      setCurrentPage(currentPage - 1);
    }
  }

  function nextPage() {
    if (currentPage + 1 < totalPages) {
      changePage(currentPage + 1);
      setCurrentPage(currentPage + 1);
    }
  }

  useEffect(() => {
    navigation.addListener("blur", (e) => {
      if (!canBack) {
        setCanBack(true);
      }

      setPrioridade("1");
    });
  }, [navigation]);

  useEffect(() => {
    getChamados();
    getChamadosAndamento();
  }, [refreshing, prioridade]);

  useEffect(() => {
    setPagination(null);
    const totalItems = 8;
    setCurrentPage(0);

    function calcPagination() {
      let pages = Math.ceil(chamados?.length / totalItems);
      setTotalPages(pages);
      let buttons = [];

      for (let i = 0; i < pages; i++) {
        buttons.push({ from: i * totalItems, to: (i + 1) * totalItems });
      }

      setPaginationButtons(buttons);
    }

    calcPagination();
    genPagination(0, totalItems);
  }, [chamados]);

  useEffect(() => {
    function canGoBack() {
      if (chamadosAndamento === null) return;

      if (chamadosAndamento.length !== 0) {
        if (!canBack) {
          setCanBack(true);
          navigation.navigate("Home");
        }
      }
    }

    canGoBack();
  }, [chamadosAndamento, canBack]);

  return (
    <View style={[styles.container, styleTheme.container]}>
      <View style={styles.viewTitulo}>
        <Text style={[styles.titulo, styleTheme.textPrimary]}>Chamados</Text>
      </View>
      <View style={styles.viewFiltro}>
        {chamados !== null && (
          <View style={styles.fieldFiltro}>
            <Text style={[styles.textPrioridade, styleTheme.textPrimary]}>
              Prioridade:
            </Text>
            <SelectList
              data={filtroItem}
              value={prioridade}
              setSelected={(e) => setPrioridade(e)}
              placeholder={filtroItem[Number(prioridade) - 1].value}
              search={false}
              boxStyles={[
                {
                  borderWidth: 2,
                  borderColor: "#23AFFF",
                  height: 50,
                  width: 150,
                },
                styleTheme.containerSecundary,
              ]}
              fontFamily="Poppins_400Regular"
              inputStyles={{
                color: styleTheme.textPrimary.color,
                fontSize: 15,
                marginLeft: -10,
              }}
              dropdownStyles={{
                width: 150,
                position: "absolute",
                backgroundColor: styleTheme.containerSecundary.backgroundColor,
                zIndex: 10,
                top: 50,
                borderWidth: 2,
                borderColor: "#23AFFF",
              }}
              dropdownTextStyles={styleTheme.textPrimary}
            />
          </View>
        )}
      </View>

      <View style={styles.viewChamados}>
        {chamadosAndamento === null || chamados === null ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="large" color="#23AFFF" />
          </View>
        ) : chamadosAndamento?.length !== 0 ? (
          <View>
            <Text
              style={[styles.textoChamadoAndamento, styleTheme.textPrimary]}
            >
              Você já possui um chamado em andamento.
            </Text>
            <Text
              style={[styles.textoChamadoAndamento, styleTheme.textPrimary]}
            >
              Vá até a Home para mais detalhes.
            </Text>
          </View>
        ) : (
          <View style={styles.viewFlatList}>
            {chamados.length === 0 ? (
              <View style={styles.viewSemChamados}>
                <Text style={[styles.textoSemChamados, styleTheme.textPrimary]}>
                  Não há chamados pendentes.
                </Text>
              </View>
            ) : (
              <ScrollView
                ref={scrollRef}
                style={styles.flatlist}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={() => {
                      setRefreshing(true);
                    }}
                  />
                }
              >
                {pagination}
                {totalPages > 1 && (
                  <View
                    style={[
                      styles.viewPaginationButtons,
                      styleTheme.containerSecundary,
                    ]}
                  >
                    <TouchableOpacity onPress={prevPage}>
                      <MaterialCommunityIcons
                        name="chevron-left"
                        size={30}
                        color="#23AFFF"
                      />
                    </TouchableOpacity>
                    <View style={styles.pageButtons}>
                      {paginationButtons?.map((button, index) => {
                        if (currentPage < 2) {
                          if (index >= 0 && index < 5) {
                            return (
                              <PaginationButton
                                key={index}
                                index={index}
                                handleChangePage={(e) => handleChangePage(e)}
                                select={index === currentPage ? true : false}
                              />
                            );
                          }
                        }

                        if (currentPage > totalPages - 3) {
                          if (index >= totalPages - 5 && index < totalPages) {
                            return (
                              <PaginationButton
                                key={index}
                                index={index}
                                handleChangePage={(e) => handleChangePage(e)}
                                select={index === currentPage ? true : false}
                              />
                            );
                          }
                        }

                        if (
                          index >= currentPage - 2 &&
                          index < currentPage + 3
                        ) {
                          return (
                            <PaginationButton
                              key={index}
                              index={index}
                              handleChangePage={(e) => handleChangePage(e)}
                              select={index === currentPage ? true : false}
                            />
                          );
                        }
                      })}
                    </View>
                    <TouchableOpacity onPress={nextPage}>
                      <MaterialCommunityIcons
                        name="chevron-right"
                        size={30}
                        color="#23AFFF"
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </ScrollView>
            )}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
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
  viewChamados: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  textoChamadoAndamento: {
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
  viewFlatList: {
    flex: 1,
    width: "100%",
  },
  flatlist: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
    height: "100%",
  },
  viewSemChamados: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textoSemChamados: {
    fontFamily: "Poppins_400Regular",
  },
  viewFiltro: {
    width: "100%",
    paddingLeft: 20,
    paddingRight: 20,
    display: "flex",
    alignItems: "flex-end",
    paddingBottom: 5,
  },
  fieldFiltro: {
    display: "flex",
    flexDirection: "row",
  },
  textPrioridade: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    paddingRight: 5,
    marginTop: 10,
  },
  viewPaginationButtons: {
    marginBottom: 40,
    display: "flex",
    flexDirection: "row",
    elevation: 1,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderRadius: 20,
  },
  pageButtons: {
    display: "flex",
    flexDirection: "row",
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
  },
});
