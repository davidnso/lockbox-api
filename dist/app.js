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
require("dotenv").config();
const app = expressDriver_1.ExpressDriver.build();
/**
 * build the express driver and start the application server.
 */
const server = http.createServer(app);
server.listen(process.env.PORT, () => {
    console.log("LockBox Api running on port " + process.env.PORT);
});
// const app = ExpressDriver.build();
// MongoDriver.buildDriver(process.env.DB_URI as string).then(async dataStore => {
//   const userDataStore = await MongoDriver.instantiateConnection("users");
//   new UserMongoDataStore(userDataStore);
//   const server = http.createServer(app);
//   server.listen(process.env.PORT, () => {
//     console.log("LockBox Api running on port " + process.env.PORT);
//   });
//   // new UserMongoDataStore(dataStore);
// });
