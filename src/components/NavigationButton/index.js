import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFonts, Poppins_600SemiBold } from "@expo-google-fonts/poppins";
import {Inter_600SemiBold} from "@expo-google-fonts/inter"

// <MaterialCommunityIcons name="account" size={24} color="black" />
// <MaterialCommunityIcons name="clipboard-list-outline" size={24} color="black" />

export default function NavigationButton(props) {
  const { name, pageName, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;

  let [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
    Inter_600SemiBold
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.buttonNavigation}>
        <MaterialCommunityIcons
          name={name}
          size={30}
          color={focused ? "#23AFFF" : "#A9A3A3"}
        />
        <Text
          style={[styles.texto, { color: focused ? "#23AFFF" : "#A9A3A3" }]}
        >
          {pageName}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonNavigation: {
    display: "flex",
    alignItems: "center",
    width: 200,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
  },
  texto: {
    fontFamily: "Inter_600SemiBold",
  },
});
