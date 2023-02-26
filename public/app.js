
const worker = new Worker("worker.js");

const TITLE_NOTIFY = 'Сейчас на радио OTUS играет';
const ICON_NOTIFY_PATH = './icons/music-icon.png';
const ICON_OTUS_PATH = './icons/otus-icon.jpg';

document.querySelector('.js-start').addEventListener('click', () => {
  worker.postMessage({ type: 'start' });

  if (window.Notification && Notification.permission !== "denied") {
    Notification.requestPermission((status) => {
      if (status === 'granted') {
        const notify = new Notification('OTUS', {
          body: 'Первое уведомление',
          icon: ICON_OTUS_PATH
        });
        setTimeout(() => { notify.close() }, 1000);
      };
    })
  };

});

document.querySelector('.js-stop').addEventListener('click', () => {
  worker.postMessage({ type: 'stop' });
});

function sendNotification(title, body, icon) {
  return new Notification(title, {
    body: body,
    icon: icon
  });
}

let notification;
worker.onmessage = function (event) {
  const jsParse = (JSON.parse(event.data.text));
  const body = jsParse.text;
  if (jsParse.type === 'message') {
    document.querySelector('#messages').innerHTML += `<div>${TITLE_NOTIFY} ${body}</div>`;
    if (notification) notification.close();
    notification = sendNotification(TITLE_NOTIFY, body, ICON_NOTIFY_PATH);
  };
};
