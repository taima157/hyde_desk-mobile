import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView} from 'react-native';
import {StackRoutes} from './src/routes/stack.routes'


export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StackRoutes />
      <StatusBar barStyle="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(242,242,242)',
  },
});
