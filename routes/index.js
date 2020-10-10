const userRoutes = require("./userRoutes");

// Place all routes to different controllers and static files here
module.exports = routes = (app) => {
  app.use("/test", (req, res) => {
    res.send("test");
  });

  app.use("/users", userRoutes);
};
