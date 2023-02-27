import Modal from "react-native-modal";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "../../context/theme";

export default function ModalLoading({ isVisible }) {
  const { theme, styleTheme } = useContext(ThemeContext);

  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.2}
      style={styles.modalLoading}
    >
      <View style={[styles.viewModalLoading, styleTheme.containerSecundary]}>
        <ActivityIndicator size="large" color="#23AFFF" />
        <Text style={[styles.textoLoading, styleTheme.textPrimary]}>
          Processando...
        </Text>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalLoading: {
    justifyContent: "center",
    alignItems: "center",
  },
  viewModalLoading: {
    backgroundColor: "#FFF",
    width: "80%",
    paddingTop: 30,
    paddingBottom: 20,
    borderRadius: 10,
    elevation: 10,
  },
  textoLoading: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    fontFamily: "Poppins_400Regular",
  },
});
