import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../pages/Login";
import Editar from "../pages/Editar";
import Cadastro from "../pages/Cadastro";
import CadastroContato from "../pages/cadastroContato";
import Header from "../components/header";
import CadastrarFoto from "../pages/CadastrarFoto";

const { Screen, Navigator } = createNativeStackNavigator()
export function StackRoutes() {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }} />
        <Screen
          name="Cadastro"
          component={Cadastro}
          options={{
            headerTitle: () => <Header />,
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: 'rgb(242,242,242)',
            }
          }}
        />
        <Screen
          name="CadastroContato"
          component={CadastroContato}
          options={{
            headerTitle: () => <Header />,
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: 'rgb(242,242,242)'
            }
          }}
        />
        <Screen
          name="CadastrarFoto"
          component={CadastrarFoto}
          options={{
            headerTitle: () => <Header />,
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: 'rgb(242,242,242)'
            }
          }}
        />
        <Screen
          name="Editar"
          component={Editar}
          options={{
            // headerShown: false,
          }} />
      </Navigator>
    </NavigationContainer>
  );
}

export default StackRoutes