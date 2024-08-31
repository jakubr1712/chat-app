import express from "express";
import connectDB from "./database";
import authRoutes from "./routes/auth";
import messageRoutes from "./routes/messages";
import { Server as SocketIOServer, Socket } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

connectDB();
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);

const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.FRONTEND_URL as string,
    credentials: true,
  },
});

global.onlineUsers = new Map<string, string>();

io.on("connection", (socket: Socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
