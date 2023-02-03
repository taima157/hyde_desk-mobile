import { View, StyleSheet, Text } from "react-native";
// import {useFonts, Poppins_900Black_Italic} from '@expo-google-fonts/poppins'

function Header() {
    // let [fontsLoaded] = useFonts({
    //     Poppins_900Black_Italic,
    //   });

    //   if (!fontsLoaded) {
    //     return null;
    //   }


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
        backgroundColor: "#FBFBFB",
        justifyContent: 'center',
        flexDirection: 'row',
        paddingTop: 25,
    },
    help: {
        fontSize: 24,
        // fontFamily: 'Poppins_900Black_Italic',
        fontWeight: 'bold',
        color: '#23AFFF',
    },
    desk: {
        fontSize: 24,
        // fontFamily: 'Poppins_900Black_Italic',
        fontWeight: 'bold',
    }
});