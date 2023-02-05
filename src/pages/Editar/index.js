import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useFonts, Poppins_700Bold, Poppins_400Regular, } from "@expo-google-fonts/poppins";
function Editar(){
    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold
      });
    
      if (!fontsLoaded) {
        return null;
      }
    
    return (
        <View style={{backgroundColor: "#fff", height: "100%"}}>
            <View style={styles.viewImage}>
                <Image source={require("../../../assets/user.png")} />
            </View>
            <View style={styles.viewText}>
                <Text >Fulano da Silva</Text>
                <Text style={styles.bold}>waldirReiDelas@gmail.com</Text> 

            <TouchableOpacity style={styles.editar}>
                <Text style={styles.textStyle}>Editar Perfil</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.viewDados}>
                <Text>Meus Dados</Text>

                <View style={styles.viewDados2}>
                    <Text style={styles.textDados}>Matricula: </Text>
                    <Text style={styles.textDados}>Especialidade: </Text>
                    <Text style={styles.textDados}>CPF: </Text>
                    <Text style={styles.textDados}>Telefone: </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    viewImage: {
        width: "100%",
        alignItems: "center",
        marginTop: 50,
    },
    viewText: {
        width: "100%",
        alignItems: 'center',
        marginTop: 20,
    },
    editar: {
        backgroundColor: "#23AFFF",
        width: 200,
        alignItems: 'center',
        padding: 10,
        borderRadius: 30,
        marginTop: 20
    },
    textStyle: {
        color: "#fff" ,
        fontSize: 18,
        fontWeight: "bold",
    },
    viewDados: {
        marginTop: 60,
        padding: 20,
    },
    viewDados2 :{
        width: "100%",
        marginTop: 15,
    },
    textDados: {
        color: "#a8a7a7",
        borderBottomColor: "#a8a7a7",
        borderBottomWidth: 1,
        marginBottom: 20,
    },
})
export default Editar;