import { Socket } from "socket.io";

declare global {
  var onlineUsers: Map<string, string>;
  var chatSocket: Socket;
}
