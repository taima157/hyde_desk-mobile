import { View, Text, TextInput } from "react-native-web"

export default function EditarPerfil({ route }) {

    const dados = route.params
    return(
        <View>

            <TextInput  placeholder="Nome:" >{data.nome}</TextInput>
            <Text></Text>
        </View>
    )
}