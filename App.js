import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text} from 'react-native';
import Cadastro from './src/pages/Cadastro';


export default function App() {

  return (
    <View style={styles.container}>
      <Cadastro/>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
