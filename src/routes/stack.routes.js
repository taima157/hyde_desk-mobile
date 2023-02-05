import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../pages/Login";
import Editar from "../pages/Editar";

const {Screen, Navigator} = createNativeStackNavigator()

function StackRoutes(){
    return(
        <NavigationContainer>
            <Navigator>
                <Screen 
                name="Login"
                component={Login}
                options={{
                    headerShown: false,
                }}/>
                <Screen 
                name="Editar"
                component={Editar}
                options={{
                    // headerShown: false,
                }}/>
            </Navigator>
        </NavigationContainer>
    )
}

export default StackRoutes