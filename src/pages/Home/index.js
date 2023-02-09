import { View, StyleSheet, Text } from "react-native";

export default function Home() {
  return <View style={styles.container}>
    <Text>Teste</Text>
  </View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
