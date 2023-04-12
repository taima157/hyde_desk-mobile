import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import CadastroContato from "../pages/CadastroContato";
import Header from "../components/Header";
import CadastrarFoto from "../pages/CadastrarFoto";
import TabRoutes from "./tab.routes";
import EditarPerfil from "../pages/EditarPerfil";
import { AuthProvider } from "../context/auth";
import { ThemeProvider } from "../context/theme";
import RecuperarSenha from "../pages/RecuperarSenha";
import ConfirmarToken from "../pages/ConfirmarToken";
import TrocarSenha from "../pages/TrocarSenha";
import Autenticado from "../pages/Autenticado";

const { Screen, Navigator } = createNativeStackNavigator();
export function StackRoutes() {
  return (
    <NavigationContainer>
      <ThemeProvider>
        <AuthProvider>
          <Navigator
            screenOptions={{
              header: (props) => <Header {...props} />,
            }}
          >
            <Screen name="Login" component={Login} />
            <Screen name="Cadastro" component={Cadastro} />
            <Screen name="CadastroContato" component={CadastroContato} />
            <Screen name="CadastrarFoto" component={CadastrarFoto} />
            <Screen name="Logado" component={TabRoutes} />
            <Screen name="Editar Perfil" component={EditarPerfil} />
            <Screen name="Recuperar Senha" component={RecuperarSenha} />
            <Screen name="ConfirmarToken" component={ConfirmarToken} />
            <Screen name="TrocarSenha" component={TrocarSenha} />
            <Screen name="Autenticado" component={Autenticado} />
          </Navigator>
        </AuthProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
}

export default StackRoutes;
