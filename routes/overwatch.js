const express = require("express");

let maxNumber = 10000;

const randomUsers = require("../functions");
const randomArray = require("../functions");

module.exports = function (io) {
  const overwatchIO = io;
  let router = express.Router();

  router.get("/");

  /*listen to events*/
  overwatchIO.on("connection", (socket) => {
    socket.on("disconnect", () => {
      clearInterval(usersInterval);
      clearInterval(teaWinRates);
      clearInterval(usersChoiceTanks);
      clearInterval(usersChoiceDPS);
      clearInterval(usersChoiceHealers);
    });

    socket.on("overwatchChangeUsersNumber", (data) => {
      maxNumber = data;
    });

    /*generate users number*/
    const usersInterval = setInterval(() => {
      socket.emit(
        "overwatchNewNumber",
        randomUsers.generateRandomUsers(5000, maxNumber)
      );
    }, 2000);

    /*generate team win rates*/
    const teaWinRates = setInterval(() => {
      socket.emit("overwatchTeamWinRate", randomArray.generateRandomArray(20, 60, 10));
    }, 3000);

    /*generate users choice tanks number*/
    const usersChoiceTanks = setInterval(() => {
      socket.emit(
        "overwatchUsersChoiceTanks",
        randomArray.generateRandomArray(10, 80, 8)
      );
    }, 2500);

    /*generate users choice dps number*/
    const usersChoiceDPS = setInterval(() => {
      socket.emit("overwatchUsersChoiceDPS", randomArray.generateRandomArray(7, 90, 17));
    }, 3000);

    /*generate users choice dps number*/
    const usersChoiceHealers = setInterval(() => {
      socket.emit(
        "overwatchUsersChoiceHealers",
        randomArray.generateRandomArray(7, 90, 7)
      );
    }, 2200);
  });
  return router;
};
