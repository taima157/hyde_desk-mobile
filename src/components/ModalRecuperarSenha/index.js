// import { Text, View, Modal, StyleSheet, TouchableOpacity } from "react-native";
// import { useState } from "react";
// import { TextInput } from "react-native-gesture-handler";
// import {
//   useFonts,
//   Poppins_700Bold,
//   Poppins_400Regular,
//   Poppins_600SemiBold,
// } from "@expo-google-fonts/poppins";

// export default function RecuperarSenha() {
//   const [modalVisible, setModalVisible] = useState(false);

//   let [fontsLoaded] = useFonts({
//     Poppins_700Bold,
//     Poppins_400Regular,
//     Poppins_600SemiBold
//   });

//   if (!fontsLoaded) {
//     return null;
//   }

//   return (
//     <View style={styles.container}>
//       <Modal
//         style={styles.modal}
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => {
//           setModalVisible(!modalVisible);
//         }}
//       >
//         <View style={styles.containerModal}>
//           <View style={styles.modalCard}>
//             <Text style={styles.textoTitulo}>Recuperar Senha</Text>
//             <TextInput style={styles.textoInput} placeholder="seuemail@gmail.com" />
//             <View style={styles.containerBotoes}>
//               <TouchableOpacity
//                 style={styles.botaoModal}
//                 onPress={() => setModalVisible(!modalVisible)}
//               >
//                 <Text style={styles.textoBotao}>Cancelar</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[styles.botaoModal, styles.botaoConfirmar]}
//                 onPress={() => ""}
//               >
//                 <Text style={[styles.textoBotao, styles.textoConfirmar]}>Confirmar</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//       <TouchableOpacity
//         style={styles.BotaoRecuperarSenha}
//         onPress={() => setModalVisible(true)}
//       >
//         <Text style={styles.textStyle}>Recuperar Senha</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     flexDirection: "row",
//   },

//   containerModal: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   modalCard: {
//     width: "90%",
//     display: "flex",
//     alignItems: "center",
//     backgroundColor: "white",
//     borderRadius: 20,
//     padding: 10,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },

//   containerBotoes:{
//     width: "100%",
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "space-evenly",
//     marginTop: 20,
//   },

//   textoTitulo: {
//     marginBottom: 15,
//     fontSize: 24,
//     textAlign: "center",
//     fontFamily: "Poppins_700Bold",
//   },

//   textoInput:{
//     width: "95%",
//     height: 52,
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     borderBottomColor: "#000",
//     borderWidth: 2,
//     padding: 15,
//   },

//   botaoModal:{
//     width: "40%",
//     display: "flex",
//     borderRadius: 20,
//     alignItems: "center",
//     borderWidth: 2,
//     borderColor: "#23AFFF",
//     padding: 5,
//   },

//   textoBotao:{
//     textAlign: "center",
//     fontFamily: "Poppins_600SemiBold",
//     color: "#23AFFF"
//   },

//   botaoConfirmar:{
//     backgroundColor: "#23AFFF",
//   },

//   textoConfirmar:{
//     color: "#fff",
//   }
  
// });
