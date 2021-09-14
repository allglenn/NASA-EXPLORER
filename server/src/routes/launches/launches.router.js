const express = require("express");
const launchesRouter = express.Router();
const { getAllLaunches ,httpAddNewLanche,httpDeletLaunch} = require("./launches.controller");

launchesRouter.get("/", getAllLaunches);
launchesRouter.post("/", httpAddNewLanche);
launchesRouter.delete("/:flightNumber", httpDeletLaunch);

module.exports = launchesRouter
 