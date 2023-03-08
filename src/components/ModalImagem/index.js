import Modal from "react-native-modal";
import ImageViewer from "react-native-image-zoom-viewer";
import { TouchableOpacity, Text, StatusBar, StyleSheet } from "react-native";

export default function ModalImagem({ isVisible, url, close }) {
  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.1}
      style={{ width: "100%", margin: 0, height: "100%" }}
    >
      <ImageViewer
        imageUrls={[
          {
            url: url,
          },
        ]}
        saveToLocalByLongPress={false}
      />
      <TouchableOpacity
        style={styles.botaoModalImagem}
        onPress={close}
        activeOpacity={0.9}
      >
        <Text style={styles.textoBotaoModalImagem}>Fechar</Text>
      </TouchableOpacity>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
    </Modal>
  );
}

const styles = StyleSheet.create({
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
});
