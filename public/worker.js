const url = 'ws://localhost:8080';

let socket;
addEventListener('message', (event) => {
  if (event.data.type === 'start') socket = new WebSocket(url);
  if (event.data.type === 'stop') socket && socket.close();
  socket.onmessage = function (message) {
    postMessage({ type: 'message', text: message.data});
  }
});
