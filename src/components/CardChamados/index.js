import axios from "axios";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { api } from "../../services/api";

export default function CardChamados({ chamado }) {
  const [empresa, setEmpresa] = useState([]);
  const [endereco, setEndereco] = useState([]);

  useEffect(() => {
    async function getFuncionarioEmpresa() {
      try {
        const funcionario = await api.get(
          `/funcionarios/${chamado.funcionario_id}`
        );

        const empresa = await api.get(
          `/empresas/${funcionario.data.empresa_id}`
        );

        setEmpresa(empresa.data);

        const endereco = await axios.get(`https://viacep.com.br/ws/${empresa.data.cep}/json/`)
        setEndereco(endereco.data)
      } catch (error) {
        console.log(error);
      }
    }

    getFuncionarioEmpresa();
  }, []);

  return (
    <View style={styles.viewCardChamado}>
      <Text style={styles.nomeEmpresa}>{empresa.nome}</Text>
      <View style={styles.enderecoData}>
        <Text style={styles.endereco}>{endereco.logradouro}, {empresa.numero_endereco}</Text>
        <Text style={styles.data}>04/02 - 22:38</Text>
      </View>
      <View style={styles.problemaPrioridade}>
        <Text style={styles.problema}>{chamado.problema}</Text>
        <Text style={styles.prioridade}>Prioridade {chamado.prioridade}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewCardChamado: {
    backgroundColor: "#FFF",
    width: "100%",
    borderColor: "#1368f1",
    borderWidth: 2,
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 25,
    alignItems: "center",
    marginBottom: 30,
    paddingLeft: 15,
    paddingRight: 15
  },
  nomeEmpresa: {
    width: "85%",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  enderecoData: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10
  },
  endereco: {
    width: "50%",
    paddingLeft: 10,
    paddingRight: 10,
  },
  data: {
    width: "50%",
    paddingLeft: 10,
    paddingRight: 10,
  },
  problemaPrioridade:{
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10
  },
  problema: {
    textTransform: "capitalize",
    width: "50%",
    paddingLeft: 10,
    paddingRight: 10,
  },
  prioridade: {
    textTransform: "capitalize",
    width: "50%",
    paddingLeft: 10,
    paddingRight: 10,
  }
});
