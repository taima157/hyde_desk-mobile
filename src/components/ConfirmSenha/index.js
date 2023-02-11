import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import { useFonts, Poppins_700Bold } from "@expo-google-fonts/poppins";

function ConfirmSenha() {

    let [fontsLoaded] = useFonts({
        Poppins_700Bold,
      });
    
      if (!fontsLoaded) {
        return null;
      }

  return (
    <View style={styles.containerModal}>
      <Modal isVisible={true} backdropOpacity={0.1}>
        <View style={styles.modalView}>
          <Text style={styles.title}>Confirmar senha</Text>
          <View style={styles.containerInput}>
            <TextInput
              style={styles.inputPassword}
              placeholder="Senha:"
              placeholderTextColor="#000000"
              secureTextEntry={true}
              maxLength={11}
            ></TextInput>
            <TouchableOpacity style={styles.buttonConfirmar}>
              <Text style={styles.textConfirmar}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default ConfirmSenha;

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: "#FFF",
    // marginTop: 200,
    // marginBottom: 200,
    marginLeft: 5,
    marginRight: 5,
    elevation: 10,
    borderRadius: 20,
   
  },
  title: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 22,
    textAlign: "center",
    marginTop: 50,
  },
  inputPassword: {
    height: 50,
    borderWidth: 1,
    marginTop: 50,
    padding: 10,
    borderRadius: 10,
    height: 50,
    width: "80%",
    color: "#000",
    fontSize: 15,
  },
  containerInput: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonConfirmar: {
    backgroundColor: "#23AFFF",
    height: 50,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    marginBottom: 50,
    marginTop: 50
  },
  textConfirmar: {
    fontFamily: 'Poppins_700Bold',
    color: "#fff",
    fontSize: 22,
  },
});
