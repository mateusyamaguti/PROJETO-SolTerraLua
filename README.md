# Aplicação AR multiplayer Sol-Terra-Lua em Three.js

## Pré-requisitos

Para iniciar o servidor em https são necessários os seguintes pré-requisitos:
1) Instalar o pacote node http-server caso ainda não esteja instalado: `npm install --global http-server`
2) Ter um certificado SSL. Para criar um, rodar o comando: `openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pe`. O certificado terá validade pelo número de `days` indicado (3650, no exemplo).

## Transmissão do servidor para os clientes

Para transmitir em rede local via wi-fi hotspot do computador do servidor para as máquinas clientes é necessário:

1) Ligar o Wi-Fi Hotspot na configuração wifi do ubuntu.
2) Iniciar o servidor em https com o comando: `http-server -S -C cert.pem -o`
3) O `http-server` fornece dois endereços. Somente o endereço mais curto é acessível do cliente conectado na rede wi-fi hotspot do servidor. Exemplo: `https://10.42.0.1:8080`
4) No dispositivo cliente, conectar na rede hotspot do servidor (se tiver acesso a 4G, desabilitá-lo, senão ele vai tentar conectar no 4G para buscar internet).
5) Acessar o endereço informado no passo 3. No primeiro acesso, apesar do https, o browser informará que a conexão não é segura. Basta entrar na opção de modo inseguro e nas próximas vezes essa confirmação não será mais solicitada.

### Dificuldades com o linux Mint

As instruções acima funcionam bem com o Ubuntu, mas no Mint tive dificuldades. Consegui rodar o servidor da seguinte maneira:

- Editar a conexão de rede e escolher Hotspot(ou ponto de acesso em PT) em Wi-Fi mode. Em Wi-fi Security, usar Enhanced Open. Nenhum protocolo de segurança funcionou, por isso tive que deixar aberto.
- No navegador do oculus quest escrever o endereço completo sem esquecer do https, por exemplo: `https://10.42.0.1:8080`

## Organização das pastas

- **ssl**. Arquivos dos certificados ssl
- **threejs**. Arquivos da biblioteca Three.js
- **basicThreeJs**. Exemplo básico do getting started no site do Three.js.
- **webxr_ar_cones**. Exemplo de AR no site do Three.js. Exemplo já testado e usado como ensaio básico de servidor local no notebook para o cliente no óculos.

## Como rodar um exemplo em servidor https usando a estrutura de pastas acima

A partir do diretório raiz do projeto rodar o script `runThreeExample.sh` e escolher a pasta do exemplo de interesse na aba do navegador de internet que será aberta.


