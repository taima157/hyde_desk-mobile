import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ThemeContext } from "../../context/theme";
import {
  useFonts,
  Poppins_600SemiBold,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";

export default function PaginationButton({ index, select, handleChangePage }) {
  const {styleTheme} = useContext(ThemeContext)

  let [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
    Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableOpacity style={styles.botaoPagination} onPress={() => handleChangePage(index)}>
      <View style={[styles.viewBotao, select ? {borderBottomColor: "#23AFFF", borderBottomWidth: 2} : null]}>
        <Text style={[styles.textoBotao, styleTheme.textPrimary]}>{index + 1}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  botaoPagination: {
    marginLeft: "6%",
    marginRight: "6%"
  },
  viewBotao: {
    width: 25,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  textoBotao: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16
  }
})
