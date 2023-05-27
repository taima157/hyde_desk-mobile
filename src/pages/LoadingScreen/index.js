import { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { ThemeContext } from "../../context/theme";

export default function LoadingScreen() {
  const { styleTheme } = useContext(ThemeContext);

  return (
    <View style={[styles.container, styleTheme.container]}>
      <View style={styles.logo}>
        <Text>
          <Text style={styles.help}>Hyde</Text>
          <Text style={[styles.desk, styleTheme.textPrimary]}>Desk</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
  },
  logo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  help: {
    fontSize: 45,
    fontFamily: "Poppins_700Bold",
    color: "#23AFFF",
  },
  desk: {
    fontSize: 45,
    fontFamily: "Poppins_700Bold",
  },
});
