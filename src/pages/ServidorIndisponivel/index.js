import { useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import { ThemeContext } from "../../context/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ServidorIndisponivel({ refresh }) {
  const { styleTheme } = useContext(ThemeContext);

  return (
    <View style={[styles.container, styleTheme.container]}>
      <View style={styles.viewMensagem}>
        <Text style={[styles.titulo, styleTheme.textPrimary]}>
          Ocorreu um erro
        </Text>
        <Text style={[styles.paragrafo, styleTheme.textPrimary]}>
          Houve um erro ao carregar os dados do aplicativo.
        </Text>
        <Text style={[styles.paragrafo, styleTheme.textPrimary]}>
          Servidor está em manutenção ou indisponível no momento.
        </Text>
      </View>
      <View style={styles.viewBotoes}>
        <TouchableOpacity
          onPress={refresh}
          style={[styles.botao, styleTheme.buttonPress]}
        >
          <MaterialCommunityIcons
            name="refresh"
            size={30}
            color={styleTheme.buttonText.color}
            style={{ marginRight: 10 }}
          />
          <Text style={[styles.botaoTexto, styleTheme.buttonText]}>
            Recarregar aplicativo
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.botaoSair}
          onPress={() => BackHandler.exitApp()}
        >
          <Text style={[styles.botaoTexto, styleTheme.textPrimary]}>
            Sair do aplicativo
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    paddingTop: 55,
    paddingLeft: 25,
    paddingRight: 25,
    justifyContent: "space-between",
  },
  viewMensagem: {
    flex: 1,
  },
  titulo: {
    fontSize: 27,
    fontFamily: "Poppins_700Bold",
  },
  paragrafo: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    marginTop: 10,
  },
  viewBotoes: {
    paddingBottom: 20,
  },
  botao: {
    display: "flex",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    flexDirection: "row",
  },
  botaoTexto: {
    fontSize: 15,
    fontFamily: "Poppins_600SemiBold",
  },
  botaoSair: {
    marginTop: 20,
    alignItems: "center",
  },
});
