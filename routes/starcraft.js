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
        "starcraftGenerateUsers",
        starcraftFunctions.generateRandomUsers(5000, maxNumber)
      );
    }, 2300);

    /*send army units numbers*/
    socket.emit("starcraftArmyUnits", armyUnits);

    /*generate clan members number*/
    const clanMembersInterval = setInterval(() => {
      socket.emit(
        "starcraftClanMembers",
        starcraftFunctions.generateArrayWithSpecificNumbers()
      );
    }, 2750);

    socket.on("starcraftChangeArmyUnits", (units) => {
      armyUnits = [units[0], units[1], units[2]];
      socket.emit("starcraftArmyUnits", units);
    });
  });

  return router;
};
