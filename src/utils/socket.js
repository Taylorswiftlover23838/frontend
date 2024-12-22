
import io from "socket.io-client";

const server = "http://localhost:8020";
const socket = io(server, {
  withCredentials: true, 
});

export const emitMessage = (event, data) => {
  socket.emit(event, data);
};

export const onMessage = (event, callback) => {
  socket.on(event, callback);
};

export const offMessage = (event) => {
  socket.off(event);
};

export default socket;