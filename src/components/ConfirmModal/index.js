import { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { ThemeContext } from "../../context/theme";

export default function ConfirmModal({
  isVisible,
  fecharModal,
  confirmarAcao,
  mensagem,
  route
}) {
  const {styleTheme} = useContext(ThemeContext);

  return (
    <Modal isVisible={isVisible} backdropOpacity={0.1}>
      <View style={[styles.modalConfirmar, styleTheme.containerSecundary]}>
        <Text style={[styles.textoMensagem, styleTheme.textPrimary]}>{mensagem}</Text>
        <View style={styles.viewBotoes}>
          <TouchableOpacity
            onPress={fecharModal}
            style={[styles.botao, { borderBottomLeftRadius: 10 }]}
          >
            <Text style={styles.textoBotao}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={confirmarAcao}
            style={[styles.botao, { borderBottomRightRadius: 10 }]}
          >
            <Text style={styles.textoBotao}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalConfirmar: {
    backgroundColor: "#FFF",
    margin: 10,
    borderRadius: 10,
    elevation: 10,
  },
  textoMensagem: {
    padding: 10,
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
    fontSize: 20,
    marginBottom: 20,
    marginTop: 10,
  },
  viewBotoes: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  botao: {
    width: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    borderWidth: 1,
    borderColor: "#23AFFF",
  },
  textoBotao: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "#23AFFF",
  },
});
