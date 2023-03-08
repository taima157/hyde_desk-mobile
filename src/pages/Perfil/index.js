import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_600SemiBold,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import { api } from "../../services/api";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/auth";
import { ThemeContext } from "../../context/theme";

function Perfil({ navigation }) {
  const { user } = useContext(AuthContext);
  const { theme, styleTheme } = useContext(ThemeContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getDados() {
      try {
        try {
          const response = await api.get(`/tecnicos/${user.id_tecnico}`);
          console.log(data)
          setData(response.data);
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    }

    navigation.addListener("focus", (e) => {
      getDados();
    });
  }, [navigation]);

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  function goToEditar() {
    navigation.navigate("Editar Perfil", data);
  }

  return (
    <View style={[styles.container, styleTheme.container]}>
      {data.length === 0 ? (
        <View style={styles.activityStyle}>
          <ActivityIndicator size="large" color="#23AFFF" />
        </View>
      ) : (
        <>
          <View style={styles.viewImage}>
            <Image
              style={{
                width: 150,
                height: 150,
                borderRadius: 75,
                borderColor: "#23AFFF",
                borderWidth: 2,
              }}
              source={{
                uri: `https://hdteste.azurewebsites.net/${data.foto}`,
              }}
            />
          </View>

          <View style={styles.viewText}>
            <Text style={[styles.texNormal, styleTheme.textPrimary]}>
              {data.nome_tecnico}
            </Text>
            <Text style={[styles.texNormal, styleTheme.textPrimary]}>
              {data.email_tecnico}
            </Text>

            <TouchableOpacity style={styles.editar} onPress={goToEditar}>
              <Text style={styles.textStyle}>Editar Perfil</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.viewDados}>
            <Text style={[styles.textBold, styleTheme.textPrimary]}>
              Meus dados
            </Text>

            <View style={styles.viewDados2}>
              <Text style={[styles.textDados, styleTheme.textSecundary]}>
                Matricula:
                <Text style={[styles.textDado, styleTheme.textSecundary]}>
                  {" "}
                  {data.matricula}
                </Text>
              </Text>
              <Text style={[styles.textDados, styleTheme.textSecundary]}>
                Especialidade:
                <Text style={[styles.textDado, styleTheme.textSecundary]}>
                  {" "}
                  {data.especialidade}
                </Text>
              </Text>
              <Text style={[styles.textDados, styleTheme.textSecundary]}>
                CPF:
                <Text style={[styles.textDado, styleTheme.textSecundary]}>
                  {" "}
                  {data.cpf}
                </Text>
              </Text>
              <Text style={[styles.textDados, styleTheme.textSecundary]}>
                Telefone:
                <Text style={[styles.textDado, styleTheme.textSecundary]}>
                  {" "}
                  {data.telefone}
                </Text>
              </Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    padding: 20,
  },
  viewImage: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  viewText: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  editar: {
    backgroundColor: "#23AFFF",
    width: 200,
    alignItems: "center",
    padding: 10,
    borderRadius: 30,
    marginTop: 20,
    justifyContent: "center",
  },
  textStyle: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
  },
  viewDados: {
    marginTop: 50,
  },
  viewDados2: {
    width: "100%",
    marginTop: 15,
  },
  textDados: {
    color: "#a8a7a7",
    borderBottomColor: "#a8a7a7",
    borderBottomWidth: 1,
    marginBottom: 20,
    fontFamily: "Poppins_600SemiBold",
  },
  textDado: {
    color: "#a8a7a7",
    fontFamily: "Poppins_400Regular",
  },
  activityStyle: {
    paddingTop: 15,
    paddingLeft: 50,
    paddingRight: 50,
    marginTop: "80%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  activityStyle2: {
    width: "100%",
    alignItems: "center",
    marginTop: 50,
  },
  textBold: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 22,
  },
  texNormal: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
  },
});

export default Perfil;
