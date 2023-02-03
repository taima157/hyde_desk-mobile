import { View, Text, TouchableOpacity, StatusBar, StyleSheet } from "react-native";

export default function Login() {
  return(
    <View style={style.container_login}>
      <Text style={style.container_login}>Login</Text>
    </View>

  )
}

const style = StyleSheet.create({
  container_login:{
    alignItems: 'center',
    justifyContent: 'flex-start',
  }
})