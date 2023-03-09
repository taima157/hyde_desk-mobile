import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/auth";

export async function getDetalhesChamados(chamado) {
  const { errorToast } = useContext(AuthContext);

  const dataHora = chamado.data.split("T");
  let data = dataHora[0];
  let hora = dataHora[1];
  data = data.split("-");
  const horaChamado = hora.split(".")[0];
  const dataChamado = `${data[2]}/${data[1]}/${data[0]}`;

  let endereco = [];

  try {
    const responseEndereco = await axios.get(
      `https://viacep.com.br/ws/${chamado.cep}/json/`
    );

    endereco = await responseEndereco.data;
  } catch (error) {
    errorToast("Erro", "Houve um erro.");
  }

  return { ...chamado, horaChamado, dataChamado, endereco };
}
