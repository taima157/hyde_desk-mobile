import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth";
import ModalConfirmar from "../ModalConfirmar";
import { ThemeContext } from "../../context/theme";

function Header({ route }) {
  const { user, logout } = useContext(AuthContext);
  const { toggleTheme, styleTheme, theme } = useContext(ThemeContext);
  const [isModalVisible, setModalVisible] = useState(false);

  function toggleModal() {
    setModalVisible(!isModalVisible);
  }

  if (route.name === "Autenticar") {
    return <View></View>;
  }

  return (
    <View style={[styles.container, styleTheme.container]}>
      <View style={styles.viewThemeMode}>
        <TouchableOpacity onPress={toggleTheme}>
          <MaterialCommunityIcons
            name="theme-light-dark"
            size={35}
            color={styleTheme.textPrimary.color}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.titulo}>
        <Text style={styles.help}>Hyde</Text>
        <Text style={[styles.desk, styleTheme.textPrimary]}>Desk</Text>
      </View>
      <View style={styles.viewLogout}>
        {user !== null && route.name === "Logado" && (
          <TouchableOpacity onPress={toggleModal}>
            <MaterialCommunityIcons
              name="logout"
              size={34}
              color={styleTheme.textPrimary.color}
            />
          </TouchableOpacity>
        )}
      </View>
      <ModalConfirmar
        isVisible={isModalVisible}
        fecharModal={toggleModal}
        confirmarAcao={logout}
        mensagem="Deseja encerrar a sessão da conta?"
      />
      <StatusBar
        barStyle={theme === "light" ? "dark-content" : "light-content"}
        backgroundColor={theme === "light" ? "#FFF" : "#0d1117"}
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
    width: "100%",
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
    transform: [{ translateY: -11 }],
  },
  viewThemeMode: {
    position: "absolute",
    top: "50%",
    left: 15,
    transform: [{ translateY: -8 }],
  },
});
