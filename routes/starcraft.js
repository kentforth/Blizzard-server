const express = require("express");

let maxNumber = 40000;

const starcraftFunctions = require("../functions");

let armyUnits = [400, 700, 500];

module.exports = function (io) {
  const starcraftIO = io.of("/");
  let router = express.Router();

  router.get("/");

  /*listen to events*/
  starcraftIO.on("connection", (socket) => {
    socket.on("disconnect", () => {
      clearInterval(usersInterval);
      clearInterval(clanMembersInterval);
    });

    /*generate users number*/
    const usersInterval = setInterval(() => {
      socket.emit(
        "generateUsers",
        starcraftFunctions.generateRandomUsers(5000, maxNumber)
      );
    }, 2300);

    /*send army units numbers*/
    socket.emit("armyUnits", armyUnits);

    /*generate clan members number*/
    const clanMembersInterval = setInterval(() => {
      socket.emit(
        "clanMembers",
        starcraftFunctions.generateArrayWithSpecificNumbers()
      );
    }, 2750);

    socket.on("changeArmyUnits", (units) => {
      armyUnits = [units[0], units[1], units[2]];
      socket.emit("armyUnits", units);
    });
  });

  return router;
};
