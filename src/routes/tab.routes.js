import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Chamados from "../pages/Chamados";
import Perfil from "../pages/Perfil";
import Home from "../pages/Home";
import NavigationButton from "../components/NavigationButton";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/theme";
import { BackHandler } from "react-native";
import ModalConfirmar from "../components/ModalConfirmar";
import { AuthContext } from "../context/auth";

const { Screen, Navigator } = createBottomTabNavigator();

export default function TabRoutes({ route }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { logout } = useContext(AuthContext);
  const { theme, styleTheme } = useContext(ThemeContext);

  function toggleModal() {
    setIsModalVisible(!isModalVisible);
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", toggleModal);
  }, []);

  return (
    <>
      <Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            display: "flex",
            alignItems: "center",
            height: 65,
            backgroundColor: styleTheme.containerSecundary.backgroundColor,
            marginBottom: -1,
          },
        }}
      >
        <Screen
          name="Chamados"
          component={Chamados}
          options={{
            tabBarButton: (props) => {
              return (
                <NavigationButton
                  {...props}
                  name="clipboard-list-outline"
                  pageName="Chamados"
                />
              );
            },
          }}
        />
        <Screen
          name="Home"
          component={Home}
          options={{
            tabBarButton: (props) => {
              return (
                <NavigationButton {...props} name="home" pageName="Home" />
              );
            },
          }}
        />
        <Screen
          name="Perfil"
          component={Perfil}
          initialParams={{ dataTecnico: route.params }}
          options={{
            tabBarButton: (props) => {
              return (
                <NavigationButton {...props} name="account" pageName="Perfil" />
              );
            },
          }}
        />
      </Navigator>
      <ModalConfirmar
        isVisible={isModalVisible}
        fecharModal={toggleModal}
        confirmarAcao={logout}
        mensagem="Deseja mesmo sair?"
      />
    </>
  );
}
