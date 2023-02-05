import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView} from 'react-native';
import {StackRoutes} from './src/routes/stack.routes'
import Footer from './src/components/footer';


export default function App() {
  return (
    <SafeAreaView style={styles.container}>
    <StackRoutes />
    <StatusBar barStyle="auto" />
  <Footer />
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(242,242,242)',
  },
});
