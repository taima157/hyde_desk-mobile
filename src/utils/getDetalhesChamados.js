import { api } from "../services/api";
import axios from "axios";

export async function getDetalhesChamados(chamado) {
  const dataHora = chamado.data.split("T");
  let data = dataHora[0];
  let hora = dataHora[1];
  data = data.split("-");
  const horaChamado = hora.split(".")[0];
  const dataChamado = `${data[2]}/${data[1]}/${data[0]}`;

  let empresa = [];
  let endereco = [];

  try {
    const funcionario = await api.get(
      `/funcionarios/${chamado.funcionario_id}`
    );

    const responseEmpresa = await api.get(
      `/empresas/${funcionario.data.empresa_id}`
    );

    empresa = await responseEmpresa.data;
  } catch (error) {
    console.log(error);
  }

  try {
    const responseEndereco = await axios.get(
      `https://viacep.com.br/ws/${responseEmpresa.data.cep}/json/`
    );

    endereco = await responseEndereco.data;
  } catch (error) {
    console.log(error);
  }

  return { ...chamado, horaChamado, dataChamado, empresa, endereco };
}
