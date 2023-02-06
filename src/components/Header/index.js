import { View, StyleSheet, Text } from "react-native";
import {useFonts, Poppins_700Bold} from "@expo-google-fonts/poppins"

function Header() {

  let [fontsLoaded] = useFonts({
    Poppins_700Bold
  });

  if (!fontsLoaded) {
    return null;
  }


  return (
    <View style={style.container}>
      <View>
        <Text style={style.help}>Hyde</Text>
      </View>
      <View>
        <Text style={style.desk}>Desk</Text>
      </View>
    </View>
  );
}

export default Header;

const style = StyleSheet.create({
  container: {
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#FFF",
    paddingTop: 10,
  },
  help: {
    fontSize: 26,
    fontFamily: "Poppins_700Bold",
    color: "#23AFFF",
  },
  desk: {
    fontSize: 26,
    fontFamily: "Poppins_700Bold"
  },
});
