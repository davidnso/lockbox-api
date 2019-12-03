"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userHandlerFunctions = __importStar(require("../../user-module/Business-Logic"));
const serviceHandler = __importStar(require("../../service-module/Business-logic/serviceHandler"));
const buildingHandler = __importStar(require("../../building-module/business-logic/buildingHandler"));
const logHandler = __importStar(require("../../logs-module/index"));
const version = require("../../../package.json").version;
class ExpressRouteDriver {
    static buildRoutes() {
        const router = express_1.Router();
        /**
         * initialize welcome route
         */
        router.get("/", async (req, res) => {
            res.json({ version, message: "Welcome to the Lockbox API " + version });
        });
        console.log("building routes");
        /**
         * initialize public routes
         */
        this.initUserRoutes(router);
        this.initAccessLogRoutes(router);
        this.initServiceRequestRoutes(router);
        this.initBuildingRoutes(router);
        return router;
    }
    static initUserRoutes(router) {
        //get all users
        router.get("/users", async (req, res) => {
            const role = req.query.role;
            const payload = await userHandlerFunctions.fetchUsers({ role });
            res.send(payload);
        });
        //search all users, add query filters, text searching etc...
        router.get("/users/search", async (req, res) => {
            res.send("search users route");
        });
        router.get("/users/dashboard");
        /**
         * Fetching a users rommates based on the student's id.
         */
        router.get("/users/:id/roommates", fetchRoommates);
        router.get("/users/:id", findUser);
        //add a user ( register )
        router.post("/users", createUserAccount);
        router.post("/users/login", login);
        /**
         * update user account with new status or.. whatever
         */
        router.patch("/users/:id", updateUser);
        router.get("/users/:id/guests", fetchGuests);
        router.patch("/users/:id/guest", deleteGuest);
        router.get("/users/dashboard");
    }
    static initAccessLogRoutes(router) {
        /**
         * fetch all access logs, sort by date...
         */
        router.get("/logs", fetchAllLogs);
        /**
         * fetch single access log
         */
        router.get("/logs/:id", async (req, res) => {
            try {
            }
            catch (err) {
                res.status(400);
            }
        });
        /**
         * fetch and download archived routes. add query params to allow downloading bundles.
         */
        router.get("/logs/bundle", async (req, res) => {
            res.send("download archives..");
        });
        /**
         * post a new access log, flip granted or not granted flag.
         *
         * @use for the script that will populate access log to show real time updates.
         */
        router.post("/logs", async (req, res) => {
            res.send("post a new access log");
        });
    }
    static initServiceRequestRoutes(router) {
        router.get("/service/:id", fetchServiceRequests);
        router.post("/service/:id", createTicket);
        router.get("/service", fetchAllTickets);
        router.put("/service/:id", updateServiceRequest);
    }
    static initBuildingRoutes(router) {
        router.get("/buildings", fetchAllBuildings);
        router.get("/buildings/:id", fetchBuilding);
        router.get("/buildings/:id/logs", fetchBuildingLogs);
    }
}
exports.ExpressRouteDriver = ExpressRouteDriver;
/**
 *
 * User crud operations. refactor to module if time permits.
 *
 */
async function createUserAccount(req, res) {
    try {
        const user = req.body.user;
        const accountType = req.body.accountType;
        const accessRights = req.body.accessRights;
        await userHandlerFunctions.createUserAccount({ user, accountType });
        res.sendStatus(200).json();
    }
    catch (err) {
        res.sendStatus(404);
    }
}
async function findUser(req, res) {
    try {
        const id = req.params.id;
        const user = await userHandlerFunctions.findUser({ id });
        res.status(200).send(user);
    }
    catch (err) {
        res.sendStatus(404);
    }
}
async function login(req, res) {
    try {
        const loginRequest = Object.assign({}, req.body.auth);
        const user = await userHandlerFunctions.login({ loginRequest });
        res.status(200).send(user);
    }
    catch (err) {
        res.status(404);
    }
}
async function fetchRoommates(req, res) {
    try {
        const studentId = req.params.id;
        const roommates = await userHandlerFunctions.loadStudentRoommates({
            id: studentId
        });
        res.status(200).send(roommates);
    }
    catch (err) {
        res.status(404);
    }
}
async function fetchGuests(req, res) {
    try {
        const hostId = req.params.id;
        const guests = await userHandlerFunctions.findGuests({ id: hostId });
    }
    catch (err) {
        res.status(404);
    }
}
async function deleteGuest(req, res) {
    try {
        const name = req.body.name;
        const id = req.params.id;
        await userHandlerFunctions.deleteGuestByName({ id, name });
        res.status(200);
    }
    catch (err) {
        res.status(404);
    }
}
async function updateUser(req, res) {
    try {
        const updates = req.body;
        console.log(req.body);
        const id = req.params.id;
        if (updates.status) {
            await userHandlerFunctions.updateUserStatus({ id, userUpdates: updates });
        }
        res.status(200);
    }
    catch (err) {
        res.status(404).send('Error when updating document.');
    }
}
async function grantAccess(req, res, next) {
}
/**
 * service request crud operations...
 *
 */
async function fetchServiceRequests(req, res) {
    try {
        const requester = req.params.id;
        const serviceRequests = await serviceHandler.findUserServiceRequests({
            requester
        });
        res.status(200).send(serviceRequests);
    }
    catch (err) {
        res.status(404);
    }
}
async function updateServiceRequest(req, res) {
    try {
        const requestId = req.params.id;
        const update = req.body.status;
        console.log(update);
        await serviceHandler.updateSR({ requestId, response: update });
        res.status(200).json({ message: 'update complete' });
    }
    catch (err) {
        res.status(404);
    }
}
async function fetchAllTickets(req, res) {
    try {
        const tickets = await serviceHandler.fetchAllServiceRequests();
        res.status(200).send({ tickets });
    }
    catch (err) {
        res.send(400);
        console.log(err);
    }
}
async function createTicket(req, res) {
    try {
        //  const details = req.body.details;
        //  const id = req.params.id;
        //  const buildingId = req.body.building;
        //  const begin = req.body.from;
        //  const end = req.body.to;
        const requesterId = req.params.id;
        const info = req.body.info;
        console.log(info);
        await serviceHandler.createNewTicket(Object.assign({ requesterId }, info));
        res.send(200);
    }
    catch (err) {
        res.send(404);
    }
}
/**
 * Building crud operations
 *
 */
async function fetchAllBuildings(req, res) {
    try {
        const buildings = await buildingHandler.fetchAllBuildings();
        res.status(200).send({ buildings });
    }
    catch (err) {
        res.status(400);
    }
}
async function fetchBuilding(req, res) {
    try {
        const buildingId = req.params.id;
        const building = await buildingHandler.fetchBuildingById({
            id: buildingId
        });
        res.status(200).send(building);
    }
    catch (err) {
        res.status(400);
    }
}
async function fetchBuildingLogs(req, res) {
    try {
        const buildingId = req.params.id;
        const accessLogs = await buildingHandler.fetchBuildingLogsById({
            luid: buildingId
        });
        res.status(200).send({ logs: accessLogs });
    }
    catch (err) {
        res.status(400);
    }
}
async function fetchAllLogs(req, res) {
    try {
        const accessLogs = await logHandler.fetchAccessLogs();
        res.status(200).send(accessLogs);
    }
    catch (err) {
        res.status(404);
    }
}
