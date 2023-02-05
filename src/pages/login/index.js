import { StatusBar } from 'expo-status-bar';
import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';

export default function Login( {navigation} ) {
  const [nome, setNome] = useState("");
  function gotToEditar() {
    navigation.navigate("Editar")
  }
  return (
		<View style={styles.container}>
			<View style={styles.container_login}>
				<Text style={styles.login}>Login</Text>
			</View>

			<View style={styles.container_TextoInput}>
				<TextInput
					style={styles.TextoInput}
					placeholder="Username"
					placeholderTextColor="#000"
					onChangeText={(text) => setNome(text)}
				/>
				<TextInput
					style={styles.TextoSenha}
					placeholder="Senha"
					secureTextEntry={true}
					placeholderTextColor="#000"
					onChangeText={(text) => setNome(text)}
				/>
				<TouchableOpacity style={styles.Botao} onPress={() => ""}>
					<Text style={styles.TextoBotao}>LOGIN</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.container_link}>
				<Text>Ainda não é um técnico?</Text>

				<TouchableOpacity style={styles.LinkCadastro} onPress={() => ""}>
					<Text style={styles.TextoLinkCadastro}>Cadastre-se</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.container_link2}>
				<Text>Esqueceu a senha? Recuperar senha</Text>

				<TouchableOpacity style={styles.LinkCadastro} onPress={() => ""}>
					<Text style={styles.TextoLinkCadastro}>Recuperar senha</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.LinkCadastro} onPress={gotToEditar}>
					<Text style={styles.TextoLinkCadastro}>T</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		justifyContent: "center",
		// width: "100%",
	},
	container_login: {
		display: "flex",
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "flex-start",
		paddingBottom: 25,
	},

	login: {
		padding: '2%',
		fontSize: 36,
	},

	container_TextoInput: {
		width: "100%",
		alignItems: "center",
	},

	TextoInput: {
		width: 347,
		height: 52,
		backgroundColor: "#fff",
		borderRadius: 10,
		borderBottomColor: "#000",
		borderWidth: 2,
		padding: 10,
	},

	TextoSenha: {
		width: 347,
		height: 52,
		backgroundColor: "#fff",
		borderRadius: 10,
		borderBottomColor: "#000",
		borderWidth: 2,
		padding: 10,
		top: 10,
	},

	Botao: {
		backgroundColor: "#000",
		borderRadius: 10,
		width: 347,
		height: 52,
		top: 25,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},

	TextoBotao: {
		color: "#fff",
	},

	container_link: {
		paddingTop: 35,
		display: "flex",
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "center",
	},

	TextoLinkCadastro: {
		paddingLeft: 5,
		color: "#23AFFF",
	},

	container_link2: {
		paddingTop: 5,
		display: "flex",
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "center",
	},
});
