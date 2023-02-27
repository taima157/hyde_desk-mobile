import { StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import {StackRoutes} from './src/routes/stack.routes'


export default function App() {
  return (
    <SafeAreaView style={styles.container}>
    <StackRoutes />
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});
