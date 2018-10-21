const socket = new WebSocket('ws://10.131.209.244:1337');

socket.addEventListener('message', e => {
  console.log(e.data);
});

export default socket;
