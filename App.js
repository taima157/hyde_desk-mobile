import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Cadastro from './src/pages/Cadastro';

export default function App() {
  return (
    <View style={styles.container}>
      <Cadastro/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
