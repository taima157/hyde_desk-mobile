import { StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import {StackRoutes} from './src/routes/stack.routes'


export default function App() {
  return (
    <SafeAreaView style={styles.container}>
    <StackRoutes />
    <StatusBar barStyle="dark-content"  backgroundColor="#FFF"/>
    {/* <Footer /> */}
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});
