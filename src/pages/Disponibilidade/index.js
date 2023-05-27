import { useEffect, useState } from "react";
import * as Network from "expo-network";
import { api } from "../../services/api";
import { StyleSheet } from "react-native";

import LoadingScreen from "../LoadingScreen";
import SemConexao from "../SemConexao";
import ServidorIndisponivel from "../ServidorIndisponivel";

export default function Disponibilidade({ children }) {
  const [isConnected, setIsConnected] = useState(false);
  const [apiAvaliable, setApiAvaliable] = useState(false);
  const [loading, setLoading] = useState(true);

  async function getNetworkStatus() {
    const networkStatus = await Network.getNetworkStateAsync();

    setIsConnected(networkStatus.isConnected);
  }

  async function getApiStatus() {
    try {
      await api.get("/");
      setApiAvaliable(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleGetStatus() {
    setLoading(true);
    await getNetworkStatus();
    await getApiStatus();
    setLoading(false);
  }

  useEffect(() => {
    handleGetStatus();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!isConnected) {
    return <SemConexao refresh={handleGetStatus} />;
  }

  if (!apiAvaliable) {
    return <ServidorIndisponivel refresh={handleGetStatus} />;
  }

  return children;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
  },
  logo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  help: {
    fontSize: 45,
    fontFamily: "Poppins_700Bold",
    color: "#23AFFF",
  },
  desk: {
    fontSize: 45,
    fontFamily: "Poppins_700Bold",
  },
  biometria: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  botao: {
    width: "65%",
    display: "flex",
    padding: 12,
    alignItems: "center",
    borderRadius: 30,
  },
  botaoTexto: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
  encerrarSessao: {
    paddingBottom: 10,
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  textoSessao: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
  },
});
