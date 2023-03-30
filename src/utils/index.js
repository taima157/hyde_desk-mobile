import axios from "axios";
import * as Notifications from "expo-notifications";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";

export async function getDetalhesChamados(chamado) {
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
    console.log(error);
  }

  return { ...chamado, horaChamado, dataChamado, endereco };
}

export async function sendNotification({ time, title, body }) {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  const idNotification = await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
    },
    trigger: time,
  });

  return idNotification;
}

export async function cancelNotification(idNotification) {
  await Notifications.cancelScheduledNotificationAsync(idNotification);
}

export async function compartilharChamado(chamado) {
  const htmlPDF = `
      <!DOCTYPE html>
      <html lang="pt-br">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Pdf Content</title>
        </head>
        <body>
          <h1>Chamado</h1>
          <h2>${chamado.nome_empresa}</h2>
          <p><strong>Endereço: </strong>${
            chamado.endereco.logradouro +
            ", " +
            chamado.numero_endereco +
            ", " +
            chamado.endereco.bairro +
            ", " +
            chamado.endereco.localidade +
            " - " +
            chamado.endereco.uf
          }</p>
          <p><strong>Contato: </strong>${chamado.telefone}</p>
          <p><strong>Data do chamado: </strong>${chamado.dataChamado}</p>
          <p><strong>Problema: </strong>${chamado.problema}</p>
          <p><strong>Descrição: </strong>${chamado.descricao}</p>
          <p><strong>Patrimônio: </strong>${chamado.patrimonio}</p>
          <p><strong>Protocolo: </strong>${chamado.cod_verificacao}</p>
          ${
            chamado.anexo !== null
              ? ` <p><strong>Anexo:</stron></p>
          <img src='https://hydedesk-api.azurewebsites.net/${chamado.anexo}' style="width: 100vw;"/>`
              : null
          }
         
        </body>
      </html>
  `;

  const file = await Print.printToFileAsync({
    html: htmlPDF,
    base64: false,
  });

  await shareAsync(file.uri);
}
