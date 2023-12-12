const express = require("express");

const functions = require("../functions");

module.exports = function (io) {
  const diabloIO = io;
  let router = express.Router();

  router.get("/");

  diabloIO.on("connection", (socket) => {
    socket.on("disconnect", () => {
      clearInterval(topCountriesInterval);
      clearInterval(topDamagePlayers);
    });

    const topCountriesInterval = setInterval(() => {
      let topCountriesArray = [
        { min: 19, max: 20.8 },
        { min: 9.4, max: 10.1 },
        { min: 8.2, max: 8.7 },
        { min: 6.3, max: 6.9 },
        { min: 5.1, max: 5.8 },
      ];

      let newCountriesArray = functions.generateFloatNumbersArray(
        topCountriesArray,
        1
      );

      socket.emit("topCountriesDiablo", newCountriesArray);
    }, 2200);

    const topDamagePlayers = setInterval(() => {
      let damageArray = [
        { min: 5.732, max: 5.768 },
        { min: 4.316, max: 4.328 },
        { min: 7.317, max: 7.324 },
        { min: 2.362, max: 2.372 },
        { min: 4.526, max: 4.538 },
        { min: 4.512, max: 4.523 },
        { min: 5.302, max: 5.327 },
        { min: 6.205, max: 6.214 },
        { min: 4.501, max: 4.516 },
        { min: 6.987, max: 7.204 },
        { min: 4.862, max: 4.885 },
        { min: 3.329, max: 3.459 },
      ];

      let newDamageArray = functions.generateFloatNumbersArray(damageArray, 3);
      socket.emit("topDamagePlayersDiablo", newDamageArray);
    }, 3200);

    socket.on("changeCharacterChart", (data) => {
      socket.emit("diabloCharacterStats", data);
    });
  });
  return router;
};
