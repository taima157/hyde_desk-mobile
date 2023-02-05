import { StatusBar } from 'expo-status-bar';
import { useState } from "react";
import { useFonts, Poppins_700Bold } from '@expo-google-fonts/poppins';
import * as ImagePicker from "expo-image-picker";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  // Keyboard,
} from "react-native";
export default function CadastrarFoto({ navigation, route }) {

  const  data  = route.params

  console.log("Teste" + data)

  function goToEditar(){
    navigation.navigate('Editar')
  }
  const [nome, setNome] = useState("");
  const [image, setImage] = useState();

  let [fontsLoaded] = useFonts({
    Poppins_700Bold,
  });
  if (!fontsLoaded) {
    return null;
  }

  const ObterImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const usuarioFoto = {
    uri: image,
  };

  function voltar(){
    navigation.navigate('CadastroContato');
  }

  return (
    <View style={styles.container}>

      <View style={styles.container_CadastrarFoto}>
        <Text style={styles.CadastrarFoto}>Cadastro</Text>
      </View>

      <View style={styles.container_card}>
        <View style={styles.card_AdicionarUsuarios}>
          <View style={styles.container_ImageCard}>
            <TouchableOpacity
              style={styles.container_foto}
              onPress={() => ObterImage()}
            >
              <Image
                style={styles.ImgCamera}
                source={
                  image != null
                    ? { uri: image }
                    : require("../../../assets/image.png")
                }
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.containerButtonNext}>
        <TouchableOpacity style={styles.buttonNext} onPress={goToEditar}>
          <Text style={styles.textNext}>Finalizar</Text>
        </TouchableOpacity>
      </View>


        <View style={styles.containerButtonBack}>        
          <TouchableOpacity style={styles.buttonBack} onPress={voltar}>
            <Image source={require("../../../assets/arrow.png")} />
          </TouchableOpacity>
        </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    // alignItems: 'center'
    // width: "100%",
  },

  container_CadastrarFoto: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingBottom: '1%',
    paddingLeft: '1%'
  },

  CadastrarFoto: {
    paddingLeft: '2%',
    fontSize: 36,
    fontFamily: "Poppins_700Bold"
  },

  container_card: {
    width: '100%',
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },


  card_AdicionarUsuarios: {
    width: '80%',
    height: '80%',
    borderRadius: 10,
    borderColor: '#000',
    borderWidth: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  container_ImageCard: {
    backgroundColor: "#D9D9D9",
    width: 125,
    height: 125,
    borderRadius: 100,
    display: "flex",
    justifyContent: "center",
    
  },

  container_foto: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  ImgCamera: {
    width: 125,
    height: 125,
    borderRadius: 100,
  },

  buttonNext: {
    backgroundColor: "#000000",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "95%",
    borderColor: "#23AFFF",
  },
  containerButtonNext: {
    marginTop: "2%",
    justifyContent: "center",
    alignItems: "center",
  },

  containerButtonBack: {
    marginTop: "15%",
    justifyContent: "center",
    alignItems: "center",
  },


  textNext: {
    color: "#fff",
    fontSize: 16,
    textTransform: "uppercase",
    fontWeight: "bold",
  },

  containerButtonBack: {
    marginTop: "10%",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonBack: {
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    width: 40,
    height: 40,
    padding: 25,
  },
  
});