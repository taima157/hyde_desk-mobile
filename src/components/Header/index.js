import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth";
import ConfirmModal from "../ConfirmModal";

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
      <ConfirmModal
        isVisible={isModalVisible}
        fecharModal={toggleModal}
        confirmarAcao={logout}
        mensagem="Deseja mesmo sair?"
      />
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
});
