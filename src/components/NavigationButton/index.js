import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFonts, Poppins_600SemiBold } from "@expo-google-fonts/poppins";
import { useContext } from "react";
import { ThemeContext } from "../../context/theme";

export default function NavigationButton(props) {
  const { theme, styleTheme } = useContext(ThemeContext);
  const { name, pageName, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;

  let [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
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
          color={focused ? "#23AFFF" : styleTheme.textSecundary.color}
        />
        <Text
          style={[
            styles.texto,
            { color: focused ? "#23AFFF" : styleTheme.textSecundary.color },
          ]}
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
    width: 125,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
  },
  texto: {
    fontFamily: "Poppins_600SemiBold",
  },
});
