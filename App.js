import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { StackRoutes } from "./src/routes/stack.routes";
import { cancelNotification, sendNotification } from "./src/utils";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_400Regular,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";

export default function App() {
  useEffect(() => {
    async function notification() {
      const notifications = await AsyncStorage.getItem("notifications");

      if (notifications != null) {
        const notificationJSON = JSON.parse(notifications);

        await cancelNotification(notificationJSON.notificationLogin);

        const trigger = new Date(Date.now() + 60 * 60 * 1000 * 48);

        const idNotification = await sendNotification({
          title: "Notificação de ausência no sistema",
          body: "Faz mais de dois dias que você não acessa nosso sistema. Lembre-se de se conectar para  garantir um melhor desempenho em suas atividades.",
          time: trigger,
        });

        notificationJSON.notificationLogin = idNotification;
        await AsyncStorage.setItem(
          "notifications",
          JSON.stringify(notificationJSON)
        );
      } else {
        const trigger = new Date(Date.now() + 60 * 60 * 1000 * 48);

        const idNotification = await sendNotification({
          title: "Notificação de ausência no sistema",
          body: "Faz mais de dois dias que você não acessa nosso sistema. Lembre-se de se conectar para  garantir um melhor desempenho em suas atividades.",
          time: trigger,
        });

        await AsyncStorage.setItem(
          "notifications",
          JSON.stringify({
            notificationLogin: idNotification,
          })
        );
      }
    }

    notification();
  }, []);

  let [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StackRoutes />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
