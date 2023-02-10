import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import Modal from "react-native-modal";
import { AuthContext } from "../../context/auth";

function Header() {
  const { user, logout } = useContext(AuthContext);
  const [isModalVisible, setModalVisible] = useState(false);

  function toggleModal() {
    setModalVisible(!isModalVisible);
  }

  let [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.titulo}>
        <Text style={styles.help}>Hyde</Text>
        <Text style={styles.desk}>Desk</Text>
      </View>
      {user !== null ? (
        <View style={styles.viewLogout}>
          <TouchableOpacity onPress={toggleModal}>
            <MaterialCommunityIcons name="logout" size={34} color="black" />
          </TouchableOpacity>
        </View>
      ) : null}
      <Modal isVisible={isModalVisible} backdropOpacity={0.1}>
        <View style={styles.modalLogout}>
          <Text style={styles.textoMensagem}>Deseja mesmo sair?</Text>
          <View style={styles.viewBotoes}>
            <TouchableOpacity
              onPress={toggleModal}
              style={[styles.botao, { borderBottomLeftRadius: 10 }]}
            >
              <Text style={styles.textoBotao}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={logout}
              style={[styles.botao, { borderBottomRightRadius: 10 }]}
            >
              <Text style={styles.textoBotao}>Sair</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#FFF",
    paddingTop: 10,
    position: "relative",
    alignItems: "center",
  },
  titulo: {
    display: "flex",
    flexDirection: "row",
  },
  help: {
    fontSize: 26,
    fontFamily: "Poppins_700Bold",
    color: "#23AFFF",
  },
  desk: {
    fontSize: 26,
    fontFamily: "Poppins_700Bold",
  },
  viewLogout: {
    position: "absolute",
    top: "50%",
    right: 15,
    transform: [{ translateY: -10 }],
  },
  modalLogout: {
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
