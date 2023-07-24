# TesteBHUT

## Pré-requisitos
- Visual Studio Code
- Node JS
- Git
- RabbitMQ
- MongoDB (Esta em um IP 0.0.0.0/0, não necessita mudar a URL)

## Instalação
1. Clone este repositório.

2. Abra o Visual Studio Code, como o teste já está com a pasta node_modules, não é preciso realizar um npm i. Não quis que o GitHub ignorasse o node_modules, pois os dados estão leves.

3. Abra a pasta do projeto no Visual Studio Code.

## Executando o código pelo site
1. Abra o terminal da pasta e execute o comando "nodemon index".

2. Abra o frontend, que pode ser acessado pelo link disponível no GitHub ou pela pasta frontend localizada em Teste1BHUT, onde há um arquivo index.html. Isso facilitará a visualização dos endpoints da API em ação sem a necessidade de utilizar o Postman.

3. Pronto! O servidor foi inicializado e as requisições da API estarão funcionando.

## Executando o código pelo Postman
1. Abra o terminal da pasta e execute com o comando "nodemon index".

2. Abra o Postman e informe a URL necessária para verificar se a API está requisitando no servidor.

## Caso queira utilizar o Jest para testa os codigos.

1. Com o terminal aberto execute o jest com o comando "npx jest".
