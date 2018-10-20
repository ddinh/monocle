const socket = new WebSocket('ws://10.131.209.244:1337');

socket.onmessage = (e) => {
  console.log(e.data)
}

export default socket;