const notificationRouter = require("./notification");

function route(app) {
  app.use("/notification", notificationRouter);


  app.get("/api/info", (req, res) => res.send("Welcome to todolist SpiritRush"));
}
module.exports = route;
