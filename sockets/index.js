const userSockets = new Map();
const { decodeJWT } = require("../helpers/jwt");
module.exports = (io) => {
  io.on("connection", async (socket) => {
    console.log("User Connected");

    socket.on("Add-User", async (token) => {
      const decodeToken = decodeJWT(token);

      if (!decodeToken) {
        return socket.emit("error", "UnAuthorized");
      }

      userSockets.set(decodeToken.id, socket);
      console.log(`User added: ${decodeToken.id}`);
      logUserSockets();
    });

    socket.on("Add-Guest", async (token) => {
      const decodeToken = decodeJWT(token);

      if (!decodeToken) {
        return socket.emit("error", "UnAuthorized");
      }
      userSockets.set(decodeToken.id, socket);
      console.log(`Room added: ${decodeToken.id}`);
      logUserSockets();
    });

    socket.on("disconnect", async () => {
      console.log("User Disconnected");
      // Remove the user from the map on disconnect
      for (let [key, value] of userSockets.entries()) {
        if (value === socket) {
          userSockets.delete(key);
          console.log(`Removed ${key} from userSockets`);
          break;
        }
      }
      logUserSockets();
    });
  });
};

module.exports.userSockets = userSockets;

function logUserSockets() {
  const simpleMap = new Map();
  for (let [key, value] of userSockets.entries()) {
    simpleMap.set(key, value.id); // Log socket id instead of the entire socket object
  }
  console.log(`Current userSockets map: ${JSON.stringify([...simpleMap])}`);
}
