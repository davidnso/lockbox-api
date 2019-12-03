"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = __importStar(require("body-parser"));
const cors = require("cors");
const cookieParser = require("cookie-parser");
const expressRouteDriver_1 = require("./expressRouteDriver");
class ExpressDriver {
    static build() {
        this.buildExpressDriver();
        return this.app;
    }
    static buildExpressDriver() {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(cors({ origin: true, credentials: true }));
        this.app.set('trust proxy', true);
        this.app.use(cookieParser());
        this.app.use(expressRouteDriver_1.ExpressRouteDriver.buildRoutes());
    }
}
exports.ExpressDriver = ExpressDriver;
ExpressDriver.app = express();
