import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../pages/Login";
import Perfil from "../pages/Perfil";
import Cadastro from "../pages/Cadastro";
import CadastroContato from "../pages/CadastroContato";
import Header from "../components/Header";
import CadastrarFoto from "../pages/CadastrarFoto";
import TabRoutes from "./tab.routes";
import EditarPerfil from "../pages/EditarPerfil";

const { Screen, Navigator } = createNativeStackNavigator();
export function StackRoutes() {
  return (
    <NavigationContainer>
      <Header />
      <Navigator>
        <Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name="Cadastro"
          component={Cadastro}
          options={{
            headerShown: false
          }}
        />
        <Screen
          name="CadastroContato"
          component={CadastroContato}
          options={{
            headerShown: false
          }}
        />
        <Screen
          name="CadastrarFoto"
          component={CadastrarFoto}
          options={{
            headerShown: false
          }}
        />
        <Screen
          name="Logado"
          component={TabRoutes}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name="Editar Perfil"
          component={EditarPerfil}
          options={{
            headerShown: false,
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
}

export default StackRoutes;
