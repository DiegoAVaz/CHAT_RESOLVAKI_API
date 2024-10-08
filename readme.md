# Resolvaki Chat

Este projeto é um chat que interage com a API Resolvaki. A interface foi construída com HTML, CSS e JavaScript, utilizando Bootstrap para estilização e jQuery para manipulação do DOM.

## Índice

- [Arquivos](#arquivos)
- [Funcionalidades](#funcionalidades)
- [Como usar](#como-usar)
- [Requisitos](#requisitos)
- [Dependências Externas](#dependências-externas)
- [Estrutura HTML](#estrutura-html)
- [JavaScript](#javascript)
- [Estilos CSS](#estilos-css)
- [Nota sobre a Arquitetura do projeto](#nota-sobre-a-arquitetura-do-projeto)

### Arquivos:

- **index.html**: O arquivo HTML principal que define a estrutura da interface do chat.
- **css/styles.css**: Estilos personalizados para o layout do chat.
- **js/script.js**: Lógica do chat, incluindo o envio de mensagens para a API e a manipulação da interface.

## Funcionalidades

- Envio de CPF para verificar acordo.
- Exibição de opções de pagamento, contratos e detalhes de contrato.
- Integração com a API da Resolvaki para processar as mensagens enviadas pelo usuário.
- Suporte para encerrar e reiniciar o chat.

## Como usar

1. Clone este repositório ou baixe os arquivos.
2. Abra o arquivo `index.html` em um navegador web.
3. Insira seu CPF de teste (use `12345678910` como exemplo) e interaja com o chat de acordo com as opções apresentadas.

## Requisitos

- Um navegador moderno com suporte a JavaScript.
- Conexão com a internet para carregar as dependências do Bootstrap e jQuery.

## Dependências Externas

Este projeto usa as seguintes bibliotecas e frameworks:

- [Bootstrap 4](https://getbootstrap.com/docs/4.0/getting-started/introduction/): Para estilização do layout.
- [Font Awesome](https://fontawesome.com/): Para os ícones.
- [jQuery 3.2.1](https://jquery.com/): Para facilitar a manipulação do DOM.

## Estrutura HTML

O arquivo `index.html` contém a estrutura básica da página, com um formulário para envio de mensagens e um contêiner para exibição das mensagens do chat.

## JavaScript

A lógica do chat está contida no arquivo `script.js`. Ele gerencia:

- O envio e recebimento de mensagens via API.
- Validação do CPF.
- Exibição das opções e respostas no chat.

### Estilos CSS

O arquivo `styles.css` contém a personalização do layout, como as bordas dos cartões e o estilo das mensagens do chat.

### Sugestão de melhorias

Algumas melhorias que podemos implementar futuramente num projeto deste tipo é separar as funcio

## Nota sobre a Arquitetura do projeto

Este projeto utiliza uma arquitetura simples, que facilita a entrega rápida e a implementação das funcionalidades básicas. Essa abordagem é eficaz para projetos menores e permite uma rápida iteração durante o desenvolvimento.

Para projetos maiores ou futuras evoluções, pode-se considerar o uso de frameworks e uma arquitetura mais modular e organizada, que inclua.:

- **Módulos Específicos**: Separar a lógica em arquivos distintos, como controladores, services, utils, etc, para isolar responsabilidades.
- **Controladores e Serviços**: Utilizar controladores para gerenciar a lógica de negócios e serviços para chamadas de API, facilitando testes e manutenção.
- **Gerenciamento de Estado**: Considerar bibliotecas como Redux para gerenciar o estado de forma centralizada.
- **Padrões de Projeto**: Aplicar padrões como MVC ou MVVM para estruturar melhor o fluxo de dados e a interação do usuário.

Essa abordagem melhora a manutenção do código e facilita a colaboração e expansão do projeto.
