import { WebSocketServer } from "ws";
import Chat from "./../models/Chat.js";
import { insertOne } from "./../database/query.js";
import httpServer from "./mainServer.js";

const PORT = process.env.PORT || 3000;
const chatServer = new WebSocketServer({
  clientTracking: true,
  maxPayload: 4e7,
  path: "/chat",
  server: httpServer,
});

const Rooms = [];

chatServer.on("connection", function (client) {
  client.on("message", function (data, isBinary) {
    if (!isBinary) {
      const message = JSON.parse(data.toString());

      if (message["event"] == "assign") {
        assignRoom(message["host"], client);
      } else if (message["event"] == "message") {
        routeMessage(message["inviteId"], message["content"], client);
        const chatMessage = { senderId: message["hostId"], recipientId: message["inviteId"], messageType: "text", messageBody: message["content"].toString(), date: Date.now().toString() };
        insertOne(Chat, chatMessage);
      } else if (message["event"] == "connected") {
        console.log("Hello client! I am your chat server");
      }
    }
  });
});

chatServer.on("listening", function () {
  console.log("Chat server listening on port " + PORT);
});

//validate incoming connection
chatServer.on("headers", function (headers, request) {
  console.log("Validate this incoming connection");
});

chatServer.on("close", function () {
  console.log("Server closed");
});

chatServer.on("error", function (err) {
  console.log("Server error: %s", err);
});

function assignRoom(hostId, client) {
  Rooms.push({ id: hostId, client: client });
}

function routeMessage(clientId, content, client) {
  for (client of Rooms) {
    if (clientId === client.id) {
      client.client.send(content);
    }
  }
}
export default chatServer;
