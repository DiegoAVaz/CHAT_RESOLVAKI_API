document.addEventListener("DOMContentLoaded", function () {
  const chatContent = document.getElementById("chat-content");
  const messageInput = document.querySelector(".publisher-input");
  const sendButton = document.querySelector(".publisher-btn");

  let cpfValido = false;
  let aguardandoEscolha = false;
  let aguardandoContrato = false;
  let usuarioDesejaVerDetalhesContrato = false;

  function addMessage(content, reverse = false) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("media", "media-chat");
    if (reverse) messageDiv.classList.add("media-chat-reverse");

    const mediaBody = document.createElement("div");
    mediaBody.classList.add("media-body");
    mediaBody.innerHTML = `<p>${content}</p>`;

    messageDiv.appendChild(mediaBody);
    chatContent.appendChild(messageDiv);

    chatContent.scrollTop = chatContent.scrollHeight;
  }

  function showWelcomeMessage() {
    const welcomeMessage =
      "Olá, seja bem-vindo! Para começar, digite o seu CPF.";
    addMessage(welcomeMessage, true);
  }

  function showOptionsMessage() {
    const optionsMessage = `Escolha uma das opções abaixo (digite o número referente a sua escolha):<br>
      1. Verificar acordo<br>
      2. Opções de pagamento<br>
      3. Ver contratos<br>
      4. Detalhes de contrato<br>
      5. Sair
    `;
    addMessage(optionsMessage, true);
    aguardandoEscolha = true;
  }

  function showContratoOptions() {
    const contratoOptionsMessage = `Qual contrato deseja verificar?<br>
      1. Contrato 1<br>
      2. Contrato 2
    `;
    addMessage(contratoOptionsMessage, true);
    aguardandoContrato = true;
  }

  function validarEscolha(escolha) {
    const opcoesValidas = ["1", "2", "3", "4", "5"];
    return opcoesValidas.includes(escolha);
  }

  function validarContratoEscolha(escolha) {
    const opcoesContratos = ["1", "2"];
    return opcoesContratos.includes(escolha);
  }

  async function sendMessage(message) {
    try {
      const response = await fetch(
        "https://resolvaki.com.br/bot/api/Resolvaki/processar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(message),
        }
      );

      if (response.ok) {
        const data = await response.json();

        if (data.data && data.data.dividas) {
          let dividasMessage = "Essas são suas dívidas:<br>";
          data.data.dividas.forEach((divida) => {
            dividasMessage += `Contrato ${divida.idContrato}: ${divida.descricao}<br>`;
          });
          addMessage(dividasMessage, true);
          showOptionsMessage();
        }
      } else {
        addMessage("Por favor, tente novamente mais tarde.", true);
      }
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      addMessage(
        "Ocorreu um erro. Por favor, tente novamente mais tarde.",
        true
      );
    }
  }

  async function sendAcordo() {
    try {
      const response = await fetch(
        "https://resolvaki.com.br/bot/api/Resolvaki/processar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify("acordo"),
        }
      );

      if (response.ok) {
        const data = await response.json();

        if (data.data && data.data.acordo) {
          const resumo = data.data.acordo.resumo;
          const detalhes = data.data.acordo.detalhes;
          addMessage(
            `Essa é uma opção de acordo:<br>${resumo}<br>${detalhes}`,
            true
          );
          showOptionsMessage();
        }
      } else {
        addMessage("Por favor, tente novamente mais tarde.", true);
      }
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      addMessage(
        "Ocorreu um erro. Por favor, tente novamente mais tarde.",
        true
      );
    }
  }

  async function sendOpcoesPagamento() {
    try {
      const response = await fetch(
        "https://resolvaki.com.br/bot/api/Resolvaki/processar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify("opções de pagamento"),
        }
      );

      if (response.ok) {
        const data = await response.json();

        if (data.data && data.data.opcoespagamento) {
          let opcoesMessage = "Essas são suas opções de pagamento:<br>";
          data.data.opcoespagamento.forEach((opcao, index) => {
            opcoesMessage += `${index + 1}. ${opcao.tipo}: ${opcao.valor}<br>`;
          });
          addMessage(opcoesMessage, true);
          showOptionsMessage();
        }
      } else {
        addMessage("Por favor, tente novamente mais tarde.", true);
      }
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      addMessage(
        "Ocorreu um erro. Por favor, tente novamente mais tarde.",
        true
      );
    }
  }

  async function sendContrato(opcao) {
    try {
      const response = await fetch(
        `https://resolvaki.com.br/bot/api/Resolvaki/opcoes?idContrato=${opcao}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();

        if (data.idContrato) {
          addMessage(`Resumo do contrato: ${data.resumo}`, true);
          showOptionsMessage();
        }
      } else {
        addMessage("Por favor, tente novamente mais tarde.", true);
      }
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      addMessage(
        "Ocorreu um erro. Por favor, tente novamente mais tarde.",
        true
      );
    }
  }

  async function sendDetalhesContrato(opcao) {
    try {
      const response = await fetch(
        `https://resolvaki.com.br/bot/api/Resolvaki/detalhes/${opcao}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();

        if (data.idContrato) {
          const detalhesMessage = `Detalhes do contrato:<br>
            Descrição: ${data.descricao}<br>
            Valor: ${data.valor}<br>
            Data de Vencimento: ${data.dataVencimento}<br>
            Status: ${data.status}`;
          addMessage(detalhesMessage, true);
          showOptionsMessage();
        }
      } else {
        addMessage("Por favor, tente novamente mais tarde.", true);
      }
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      addMessage(
        "Ocorreu um erro. Por favor, tente novamente mais tarde.",
        true
      );
    }
  }

  function encerrarChat() {
    const encerrarMensagem = `Chat encerrado. <a href="#" id="recarregar-link" style="color: white; text-decoration: underline;">Clique aqui para recarregar</a>.`;
    addMessage(encerrarMensagem, true);

    messageInput.disabled = true;
    sendButton.disabled = true;

    document.getElementById("recarregar-link").onclick = function (event) {
      event.preventDefault();
      location.reload();
    };
  }

  sendButton.addEventListener("click", function () {
    const message = messageInput.value.trim();

    if (!cpfValido) {
      addMessage(message);

      if (message === "12345678910") {
        cpfValido = true;
        sendMessage(message);
      } else {
        addMessage("CPF inválido. Tente novamente.", true);
      }
    } else if (aguardandoEscolha) {
      addMessage(message);
      if (validarEscolha(message)) {
        aguardandoEscolha = false;

        if (message === "1") {
          sendAcordo();
        } else if (message === "2") {
          sendOpcoesPagamento();
        } else if (message === "3") {
          showContratoOptions();
        } else if (message === "4") {
          usuarioDesejaVerDetalhesContrato = true;
          showContratoOptions();
        } else if (message === "5") {
          encerrarChat();
          return;
        }
      } else {
        addMessage("Opção inválida. Tente novamente.", true);
      }
    } else if (aguardandoContrato) {
      addMessage(message);
      if (validarContratoEscolha(message)) {
        aguardandoContrato = false;
        if (usuarioDesejaVerDetalhesContrato) {
          sendDetalhesContrato(message);
          usuarioDesejaVerDetalhesContrato = false;
        } else {
          sendContrato(message);
        }
      } else {
        addMessage("Opção inválida. Tente novamente.", true);
      }
    } else {
      addMessage("Digite uma opção válida.", true);
    }

    messageInput.value = "";
  });

  showWelcomeMessage();
});
