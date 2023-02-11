import { View, Text, StyleSheet} from "react-native";

function Footer() {
    return(
        <View style={style.container}>
            <Text>© Todos os direitos reservados</Text>
        </View>
    );
}

export default Footer;

const style = StyleSheet.create({
    container: {
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        alignItems: 'center',
        padding:10,
    },
});