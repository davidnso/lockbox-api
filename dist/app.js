"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const expressDriver_1 = require("./drivers/express/expressDriver");
const http = __importStar(require("http"));
/**
 * build the express driver and start the application server.
 */
const server = http.createServer(expressDriver_1.ExpressDriver.build);
server.listen(4000, () => {
    console.log("LockBox Api running on port 4000");
});
