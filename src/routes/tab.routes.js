import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Chamados from "../pages/Chamados";
import Perfil from "../pages/Perfil";
import Home from "../pages/Home";
import NavigationButton from "../components/NavigationButton";
import { useContext } from "react";
import { ThemeContext } from "../context/theme";

const { Screen, Navigator } = createBottomTabNavigator();

export default function TabRoutes({ route }) {
  const { theme } = useContext(ThemeContext);

  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          display: "flex",
          alignItems: "center",
          height: 60,
          backgroundColor: theme === "light" ? "#FFF" : "#161b22"  
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
            return <NavigationButton {...props} name="home" pageName="Home" />;
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
  );
}
