import { WebSocketServer } from 'ws';
import { faker } from '@faker-js/faker';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import http from 'http';

const RANDOM_SONG_TIMEOUT = 4000;
const NOTIFY_TIMEOUT = 5000;
const THIN_OUT_TIMEOUT = 10000;

const app = express();
app.use(express.static('public'));
const server = http.createServer(app);

const wss = new WebSocketServer({ port: 8080 });

const randomSong = () => {
  return `${faker.music.songName()}`;
};
let sound = randomSong();

setInterval(() => {
  sound = randomSong();
}, RANDOM_SONG_TIMEOUT);


function onNewConnection(ws) {
  ws.id = uuidv4();
  console.log(`New client: ${ws.id}`);

  ws.isAlive = true;
  ws.on('pong', () => {
    ws.isAlive = true;
  });

  ws.on('message', message => {
    console.log(`Message from ${ws.id}: ${message}`);
  });

  ws.send(JSON.stringify({ type: 'info', text: 'Connected' }));

  ws.on('close', function close() {
    console.log(`Client ${ws.id} disconnected`);
    ws.isAlive = false;
  });

};

wss.on('connection', onNewConnection);

const notifyNewSong = () => {
  wss.clients.forEach(ws => {
    ws.send(JSON.stringify({ type: 'message', text: sound }));
  });
}

const intervalNotify = setInterval(notifyNewSong, NOTIFY_TIMEOUT);

const thinOut = () => {
  wss.clients.forEach(ws => {
    if (!ws.isAlive) { return ws.terminate() };
    ws.isAlive = false;
    ws.ping();
  });
};

const intervalThinOut = setInterval(thinOut, THIN_OUT_TIMEOUT);

wss.on('close', function close() {
  clearInterval(intervalThinOut);
  clearInterval(intervalNotify);
});

server.listen(8000, () => {
  console.log(`Server started on port ${server.address().port}`);
});