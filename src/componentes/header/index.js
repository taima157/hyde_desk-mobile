import { View, StyleSheet, Text } from "react-native";

function Header() {
    return (
        <View style={style.container}>
            <View>
                <Text style={style.help}>Help</Text>
            </View>
            <View>
                <Text style={style.desk}>Desk</Text>
            </View>
        </View>
    );
}

export default Header;

const style = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flexDirection: 'row',
        // paddingTop: 30,
    },
    help: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#23AFFF',
    },
    desk: {
        fontSize: 24,
        fontWeight: 'bold',
    }
});