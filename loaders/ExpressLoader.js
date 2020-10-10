const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const route = require("../routes");
const { loggerService } = require("../services");

dotenv.config({ path: ".env" });

const PORT = process.env.PORT;

class ExpressLoader {
  constructor() {
    const app = express();

    // Passes morgan logs to winston then outputs to combined.log file
    app.use(morgan("combined", { stream: loggerService.stream }));
    app.use(bodyParser.json());
    app.use(cors());

    app.get("/", async (req, res) => {
      res.send(`<h1>Fanattics Partner Dashboard API</h1>`);
    });

    route(app);

    app.use(ExpressLoader.errorHandler);

    this.server = app.listen(PORT, () => {
      console.log(`Listening in port ${PORT}`);
      loggerService.info(`Express runninng, Listening in port ${PORT}`);
    });
  }

  get Server() {
    return this.server;
  }

  static errorHandler(error, req, res, next) {
    let parsedError;

    try {
      if (error && typeof error === "object") {
        parsedError = JSON.stringify(error);
      } else {
        parsedError = error;
      }
    } catch (e) {
      console.log(e);
      loggerService.error(e);
    }

    // Log original error
    loggerService.error(parsedError);

    // If response is already sent, don't attempt to respond to client
    if (res.headersSent) {
      return next(error);
    }

    return res.status(400).json({
      success: false,
      error,
      debug: req.body,
    });
  }
}

module.exports = ExpressLoader;
