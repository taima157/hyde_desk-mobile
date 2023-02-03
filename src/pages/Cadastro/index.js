import { useState } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { Picker } from '@react-native-picker/picker'
// import Header from "../../componentes/Header";

function Cadastro() {
    const [selectedValue, setSelectedValue] = useState("");
    return (
        <View style={styles.container}>
            {/* <Header /> */}
            <View style={styles.containerTextCadastro}>
                <Text style={styles.textCadastro}>Cadastro</Text>
            </View>

            <View style={styles.containerInputs}>
                <TextInput
                    style={styles.inputs}
                    placeholder='Nome:'
                    placeholderTextColor='#000000'
                ></TextInput>
                <TextInput
                    style={styles.inputs}
                    placeholder='CPF:'
                    placeholderTextColor='#000000'
                ></TextInput>
                <Picker 
                itemStyle={{ backgroundColor: "grey", color: "blue", fontFamily:"Ebrima", fontSize:17 }}
                    selectedValue={selectedValue}
                    style={styles.picker}
                    
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                >

                    <Picker.Item label="Selecione sua especialidade" value="especialidade" />
                    <Picker.Item label="Hardware" value="Hardware" />
                    <Picker.Item label="Rede" value="Rede" />
                    <Picker.Item label="Sistema Operacional" value="sistema" />
                </Picker>
            </View>

            <View style={styles.containerButtonNext}>
                <TouchableOpacity style={styles.buttonNext}>
                    <Text style={styles.textNext}>Próximo</Text>
                </TouchableOpacity>
            </View>
        </View>
    );


}

export default Cadastro;

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    textCadastro: {
        fontWeight: 'bold',
        fontSize: 36,
    },
    containerTextCadastro: {
        marginTop: 200,
        marginLeft: 15
    },
    inputs: {
        height: 40,
        borderWidth: 2,
        marginTop: 15,
        padding: 10,
        borderRadius: 10,
        height: 50,
        width: '95%',
        color: "#000",
        fontSize: 15,

    },
    containerInputs: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
        marginTop: 41,
    },
    picker: {
        height: 40,
        width: 350,
        marginTop: 15,
        color: "#000000",
        fontSize: 15,
    },
    buttonNext: {
        backgroundColor: '#000000',
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: '95%'

    },
    containerButtonNext: {
        marginTop: 46,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textNext: {
        color: '#fff',
        fontSize: 16,
        textTransform: 'uppercase',
    }

});