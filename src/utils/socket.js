// socket.js
import io from "socket.io-client";

const server = "http://localhost:8020";
const socket = io(server, {
  withCredentials: true, 
});

// Emit a message
export const emitMessage = (event, data) => {
  socket.emit(event, data);
};

// Listen for incoming messages
export const onMessage = (event, callback) => {
  socket.on(event, callback);
};

// Cleanup listeners
export const offMessage = (event) => {
  socket.off(event);
};

export default socket;