import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

const { Screen, Navigator } = createNativeStackNavigator();

import Cadastro from "../pages/cadastro";
import CadastroContato from "../pages/cadastroContato";
import Header from "../componentes/header";

export function StackRoutes() {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen
          name="cadastro"
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
          name="cadastroContato"
          component={CadastroContato}
          options={{
            headerTitle: () => <Header />,
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: 'rgb(242,242,242)'
            }
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
}
