const express = require("express");

const functions = require("../functions");

module.exports = function (io) {
  const wowIO = io;
  let router = express.Router();

  router.get("/");

  let euRealm = [
    { min: 9.6, max: 10 },
    { min: 9, max: 9.5 },
    { min: 9, max: 9.9 },
    { min: 9.1, max: 9.9 },
    { min: 8.4, max: 8.9 },
    { min: 8.1, max: 8.4 },
    { min: 8.2, max: 8.5 },
    { min: 7.2, max: 7.9 },
    { min: 7.1, max: 7.6 },
    { min: 6.3, max: 6.7 },
    { min: 5.2, max: 5.6 },
    { min: 5.1, max: 5.8 },
  ];

  let usRealm = [
    { min: 10.4, max: 11 },
    { min: 9, max: 9.7 },
    { min: 9.2, max: 9.7 },
    { min: 9.4, max: 9.8 },
    { min: 8.3, max: 8.8 },
    { min: 8.0, max: 8.7 },
    { min: 8.2, max: 8.6 },
    { min: 7.2, max: 7.5 },
    { min: 7.1, max: 7.4 },
    { min: 6.3, max: 6.8 },
    { min: 5.1, max: 5.8 },
    { min: 5.2, max: 5.6 },
  ];

  let playersRatings = [
    { min: 2488, max: 2500 },
    { min: 2100, max: 2300 },
    { min: 2250, max: 2458 },
    { min: 1800, max: 2492 },
    { min: 2200, max: 2462 },
    { min: 1954, max: 2479 },
    { min: 1840, max: 2489 },
    { min: 2240, max: 2500 },
    { min: 2100, max: 2377 },
    { min: 1965, max: 2500 },
  ];

  let allianceRaces = [
    { min: 10, max: 15 },
    { min: 17, max: 26 },
    { min: 5, max: 17 },
    { min: 65, max: 82 },
    { min: 38, max: 48 },
    { min: 26, max: 31 },
    { min: 52, max: 72 },
  ];

  let hordeRaces = [
    { min: 10, max: 15 },
    { min: 17, max: 26 },
    { min: 5, max: 17 },
    { min: 65, max: 82 },
    { min: 38, max: 48 },
    { min: 26, max: 31 },
    { min: 52, max: 72 },
  ];

  let playersMounts = [
    { min: 80, max: 82.8 },
    { min: 72, max: 74 },
    { min: 60, max: 61.4 },
    { min: 65.5, max: 66 },
    { min: 59, max: 61.5 },
    { min: 74, max: 75.2 },
    { min: 67, max: 68.2 },
    { min: 72, max: 73.4 },
    { min: 79, max: 80.3 },
    { min: 57, max: 57.6 },
    { min: 64.5, max: 65 },
    { min: 74.7, max: 75.2 },
    { min: 60.4, max: 61 },
    { min: 52, max: 58 },
    { min: 6.8, max: 69.6 },
  ];

  let battlegroundsWon = [
    { min: 1, max: 5 },
    { min: 1, max: 4 },
    { min: 2, max: 7 },
    { min: 3, max: 8 },
    { min: 1, max: 6 },
    { min: 2, max: 5 },
    { min: 3, max: 6 },
    { min: 1, max: 6 },
    { min: 2, max: 4 },
    { min: 1, max: 7 },
    { min: 2, max: 8 },
    { min: 71, max: 92 },
    { min: 3, max: 5 },
    { min: 1, max: 5 },
    { min: 5, max: 8 },
    { min: 2, max: 9 },
    { min: 4, max: 3 },
    { min: 6, max: 10 },
    { min: 5, max: 7 },
    { min: 2, max: 6 },
  ];

  wowIO.on("connection", (socket) => {
    socket.on("disconnect", () => {
      clearInterval(characterDistributionInterval);
      clearInterval(topPlayersRatingInterval);
      clearInterval(racesInterval);
      clearInterval(playerMountsInterval);
      clearInterval(battlegroundsInterval);
    });

    const characterDistributionInterval = setInterval(() => {
      let ueRealmArray = functions.generateFloatNumbersArray(euRealm, 1);
      let usRealmArray = functions.generateFloatNumbersArray(usRealm, 1);

      let allRealmArray = [ueRealmArray, usRealmArray];

      socket.emit("wowCharacterDistribution", allRealmArray);
    }, 3000);

    const topPlayersRatingInterval = setInterval(() => {
      let ueRealmArray = functions.generateNumbersArray(playersRatings, 1);
      socket.emit("wowTopPlayersRating", ueRealmArray);
    }, 2300);

    const racesInterval = setInterval(() => {
      let allianceArray = functions.generateNumbersArray(allianceRaces, 1);
      let hordeArray = functions.generateNumbersArray(hordeRaces, 1);

      let newAllianceArray = functions.calculatePercentage(allianceArray);
      let newHordeArray = functions.calculatePercentage(hordeArray);

      let racesArray = [newAllianceArray, newHordeArray];
      socket.emit("wowPlayersRaces", racesArray);
    }, 2730);

    const playerMountsInterval = setInterval(() => {
      let mountsArray = functions.generateFloatNumbersArray(playersMounts, 1);

      socket.emit("wowPlayersMounts", mountsArray);
    }, 1780);

    const battlegroundsInterval = setInterval(() => {
      let battlegroundsWonsArray = functions.generateNumbersArray(
        battlegroundsWon,
        1
      );

      socket.emit("wowBattlegroundsRating", battlegroundsWonsArray);
    }, 2600);
  });
  return router;
};
