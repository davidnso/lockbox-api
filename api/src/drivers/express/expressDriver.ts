import express = require("express");
import * as bodyParser from "body-parser";
import cors = require("cors");
import cookieParser = require("cookie-parser");
import { ExpressRouteDriver } from "./expressRouteDriver";
export class ExpressDriver {
  static app = express();

  static build() {
    this.buildExpressDriver();

    return this.app;
  }

  private static buildExpressDriver() {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(cors({ origin: true, credentials: true }));
    this.app.set('trust proxy', true);
    this.app.use(cookieParser());
    this.app.use(ExpressRouteDriver.buildRoutes());
  }
}
