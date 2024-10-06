# Aplicação AR multiplayer Sistema Solar

> Status do Projeto: Projeto em fase de desenvolvimento

## Tópicos

## Objetivo
Este projeto tem como objetivo criar uma experiência educacional multiplayer que visa ensinar de forma interativa o funcionamento do sistema solar.

## Tecnologias, biblioteca e frameworks

- ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
- ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
- [A-Frame](https://aframe.io/)

## A-Frame
"A-Frame é uma estrutura web para construir experiências de realidade virtual (VR). A-Frame é baseado em HTML, o que o torna simples de começar. Mas o A-Frame não é apenas um gráfico de cena 3D ou uma linguagem de marcação, seu núcleo é uma estrutura poderosa de entidade-componente que fornece uma estrutura declarativa, extensível e componível para three.js" (AFRAME, 2023, tradução nossa).

### Modelo de projeto A-Frame
Sugere-se para iniciar um projeto A-Frame a estruturação de pastas da seguinte forma.<br>
![ExemplodeOrganizaçãoDeProjetoAframe](/exemploOrganizacaoDeProjetosAframe.png)

### Desenvolvimento baseado em componentes (ECS)
Para construir aplicativos de realidade aumentada (Virtual Real, VR), recomendamos colocar todo o código do aplicativo dentro de componentes, pois uma base de código A-Frame ideal consiste puramente em componentes modulares, encapsulados e desacoplados. Esses componentes podem ser testados em unidade isoladamente ou junto com outros componentes.

### Começando com A-Frame
O A-fram

### 







## Pré-requisitos

Para iniciar o servidor em https são necessários os seguintes pré-requisitos:
1) Instalar o pacote node http-server caso ainda não esteja instalado: `npm install --global http-server`
2) Ter um certificado SSL. Para criar um, rodar o comando: `openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem`. O certificado terá validade pelo número de `days` indicado (3650, no exemplo).

## Transmissão do servidor para os clientes

Para transmitir em rede local via wi-fi hotspot do computador do servidor para as máquinas clientes é necessário:

1) Ligar o Wi-Fi Hotspot na configuração wifi do ubuntu. É possível, também, ligá-lo pela linha de comando com `nmcli connection up <SSID>`, em que `<SSID>` é o nome da rede. 
2) Iniciar o servidor em https com o comando: `http-server -S -C cert.pem -o`
3) O `http-server` fornece dois endereços. Somente o endereço mais curto é acessível do cliente conectado na rede wi-fi hotspot do servidor. Exemplo: `https://10.42.0.1:8080`
4) No dispositivo cliente, conectar na rede hotspot do servidor (se tiver acesso a 4G, desabilitá-lo, senão ele vai tentar conectar no 4G para buscar internet).
5) Acessar o endereço informado no passo 3. No primeiro acesso, apesar do https, o browser informará que a conexão não é segura. Basta entrar na opção de modo inseguro e nas próximas vezes essa confirmação não será mais solicitada.

### Dificuldades com o Linux Mint

As instruções acima funcionam bem com o Ubuntu, mas no Mint tive dificuldades. Consegui rodar o servidor da seguinte maneira:

- Editar a conexão de rede e escolher Hotspot(ou ponto de acesso em PT) em Wi-Fi mode. Em Wi-fi Security, usar Enhanced Open. Nenhum protocolo de segurança funcionou, por isso tive que deixar aberto.
- No navegador do oculus quest escrever o endereço completo sem esquecer do https, por exemplo: `https://10.42.0.1:8080`

## Organização das pastas

- **ssl**. Arquivos dos certificados ssl
- **threejs**. Arquivos da biblioteca Three.js
- **basicThreeJs**. Exemplo básico do getting started no site do Three.js.
- **webxr_ar_cones**. Exemplo de AR no site do Three.js. Exemplo já testado e usado como ensaio básico de servidor local no notebook para o cliente no óculos.

## Como rodar um exemplo em servidor https usando a estrutura de pastas acima

A partir do diretório raiz do projeto rodar o script `runServer.sh` e escolher a pasta do exemplo de interesse na aba do navegador de internet que será aberta.

## Copiando pasta de um repositório Github

Para baixar pastas específicas de um repositório GitHub, como pastas de exemplos, basta acessar o site https://kinolien.github.io/gitzip/ e colar o endereço completo da pasta para baixar o seu conteúdo com arquivo zip.

## A-Frame

### Sistema de referência comum para todos os óculos

Não encontrei uma ferramenta que crie um mesmo sistema de referência baseado no ambiente real para todos os óculos. Mas é possível obter um bom resultado com os seguintes procedimentos.

- Marcar uma fronteira no ambiente parecida (embora não seja crítico o tamanho).
- Iniciar a marcação e confirmar a marcação estando na mesma posição e olhando para a mesma direção em todos os óculos.
- Para garantir que posicionamentos anteriores não sejam usados pelo A-Frame, limpar o cache do navegador.
- Incluir a opção `real-world-meshing` em `<a-scene>`. Isso não necessariamente ajuda com o posicionamento e orientação comuns a todos os óculos, mas faz com que os objetos tenham tamanhos e posições em metros no ambiente.
- A origem do sistema de coordenadas é nos pés da pessoa quando ela confirmou a fronteira. A orientação é +z na direção das costas, +x à direita e +y para cima. Ou seja, é um sistema levogiro.
- Cuidado para não recentralizar a cena em local errado ao abrir o menu padrão do óculus em modo VR ou AR. Se isso acontecer, tem que apagar o cache e recarregar a página.

## Socket.io

Para inicializar um projeto com Socket.io e Express.js:

1) Na raiz da pasta do projeto criar o arquivo package.json com o conteúdo:
```json
{
  "name": "Project name",
  "version": "0.0.1",
  "description": "Project description",
  "type": "module",
  "dependencies": {}
}
```

2) Instalar o Express.js:
```bash
npm install express@4
```

3) Instalar o Socket.io:
```bash
npm install socket.io
```

4) Os arquivos básicos do projeto serão `index.js` e `index.html`. A estrutura básica do arquivo `index.js` será:
```js
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';

import { readFileSync } from "fs";
import { createServer } from "https";

   
const app = express();
const httpsServer = createServer({
    key: readFileSync('../ssl/key.pem'),
    cert: readFileSync('../ssl/cert.pem')
  }, app);
const io = new Server(httpsServer);

//Inclusão da pasta aframe para acesso no index.html:
app.use('/aframe', express.static('../aframe/'));
//Inclusão da pasta raiz deste projeto para acesso no index.html
app.use('/', express.static('./'));

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    socket.on('messageLabel', (msg) => {
      io.emit('messageLabel', msg);
    });
  });

const port = 8080;
httpsServer.listen(port, () => {
  console.log(`server running at https://127.0.0.1:${port} and https://10.42.0.1:${port}`);
});
```

5) O servidor deverá ser inicializado com `node index.js`.

## Sobre ancoragem no A-Frame

- Para ancorar objetos ao mundo real, deve-se incluir a opção `anchored="persistent: true"` a uma `<a-entity>`. A princípio não funciona para uma `<a-entity>` que encapsule toda a cena. Tem que ancorar cada objeto individualmente ou ir testando para grupos de objetos.
- Com a ancoragem setada, mesmo deixando o oculus no modo descanso e/ou reabrindo o browser, a ancoragem é mantida. Salvo alguns bugs que ocorrem de vez em quando. Para evitá-los, o ideal é não deixar o oculus entrar em modo sleep.
- Para recentralizar os objetos e assim restabelecer uma nova ancoragem, deve limpar o cache do browser e restabelecer uma nova centralização pelo comando do próprio oculus (ícone de setas cima/baixo-esquerda/direita).

## Sobre o modo sleep do óculos Meta Quest

- Ir em settings e fazer a busca com a ferramenta de lupa pela palavra *power*. Setar os tempos de sleep e descanso para um tempo longo o suficiente para que o óculos não desligue no intervalo de troca de usuários.

- Para entrar no modo sleep mesmo antes do tempo automático, basta clicar no botão físico de ligar.

## Check-list de configuração dos óculos

- Configurar o hand tracking.
- Configurar o passthrough.
- Configurar o power sleep.

## Tarefas faltantes

- Deixar a cor do beiral diferente entre os pares de pardes para deixar menos homogêneo. Usar cores mais cinzas e talvez mais escuras.