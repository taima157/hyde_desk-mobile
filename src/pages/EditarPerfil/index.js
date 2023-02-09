import { useState } from "react"
import { View, Text, TextInput, StyleSheet } from "react-native"
import { api } from "../../services/api"

export default function EditarPerfil({ route }) {
    const dados = route.params
    console.log(dados)
    const [novosDados, setNovosDados] = useState({
        nome: dados.nome,
        email: dados.email,
        especialidade: dados.especialidade,
        telefone: dados.telefone
    })

    api.put("")
    console.log(novosDados)
    return (
        <View>
            <View style={styles.viewInput}>
                <TextInput 
                value={novosDados.nome}
                onChangeText={(e) => setNovosDados({ ...novosDados, nome: e })} 
                placeholder={`Nome: ${dados.nome}`}></TextInput>
                <TextInput 
                value={novosDados.email}
                onChangeText={(e) => setNovosDados({...novosDados, email: e})}
                placeholder={`Email: ${dados.email}`}></TextInput>
                <TextInput 
                value={novosDados.especialidade}
                onChangeText={(e) => setNovosDados({...novosDados, especialidade: e})}
                placeholder={`Especialidade: ${dados.especialidade}`}></TextInput>
                <TextInput 
                value={novosDados.telefone}
                maxLength={11}
                onChangeText={(e) => setNovosDados({...novosDados, telefone: e})}
                placeholder={`Telefone: ${dados.telefone}`}></TextInput>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

})