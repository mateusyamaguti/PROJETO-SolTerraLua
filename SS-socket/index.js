import express from 'express';
//import { createServer } from 'node:http';
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
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });

const port = 8080;
httpsServer.listen(port, () => {
  console.log(`server running at http://127.0.0.1:${port} and http://10.42.0.1:${port}`);
});