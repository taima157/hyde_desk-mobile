import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Chamados from "../pages/Chamados";
import Perfil from "../pages/Perfil";

const { Screen, Navigator } = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <Navigator screenOptions={{
      headerShown: false,
    }}>
      <Screen name="Chamados" component={Chamados} />
      <Screen name="Perfil" component={Perfil} />
    </Navigator>
  );
}
