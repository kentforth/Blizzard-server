const express = require("express");

const functions = require("../functions");

module.exports = function (io) {
  const heartstoneIO = io;
  let router = express.Router();

  router.get("/");

  heartstoneIO.on("connection", (socket) => {
    socket.on("disconnect", () => {
      clearInterval(totalGamesInterval);
      clearInterval(cardsTypeInterval);
      clearInterval(topDeckGamesInterval);
      clearInterval(classWinrate);
      clearInterval(cardsPlayed);
    });

    const totalGamesInterval = setInterval(() => {
      const randomNumber = functions.generateRandomNumber(1, 5);
      socket.emit("heartStoneTotalGames", randomNumber);
    }, 200);

    const cardsTypeInterval = setInterval(() => {
      let cardsType = [
        { min: 3, max: 7 },
        { min: 12, max: 15 },
        { min: 4, max: 8 },
        { min: 1, max: 3 },
      ];

      let newTypeCardsArray = functions.generateNumbersArray(cardsType, 1);

      socket.emit("heartstoneCardsType", newTypeCardsArray);
    }, 2100);

    const topDeckGamesInterval = setInterval(() => {
      let cardsType = [
        { min: 630, max: 645 },
        { min: 1243, max: 1250 },
        { min: 658, max: 672 },
        { min: 1421, max: 1437 },
        { min: 870, max: 895 },
        { min: 1562, max: 1570 },
      ];

      let newtopDeckGamesArray = functions.generateNumbersArray(cardsType, 1);

      socket.emit("heartstoneTopDeckGames", newtopDeckGamesArray);
    }, 3400);

    const classWinrate = setInterval(() => {
      let winrate = [
        { min: 40, max: 44.3 },
        { min: 43, max: 48 },
        { min: 43, max: 47 },
        { min: 48, max: 56 },
        { min: 39, max: 43 },
        { min: 38, max: 45 },
        { min: 48, max: 56 },
        { min: 45, max: 52 },
        { min: 41, max: 56 },
        { min: 40, max: 45 },
      ];

      let classWinrateArray = functions.generateFloatNumbersArray(winrate, 1);

      socket.emit("heartstoneWinRates", classWinrateArray);
    }, 1000);

    const cardsPlayed = setInterval(() => {
      let cards = [
        { min: 182, max: 202 },
        { min: 283, max: 203 },
        { min: 192, max: 212 },
        { min: 241, max: 261 },
        { min: 195, max: 215 },
        { min: 136, max: 156 },
        { min: 185, max: 205 },
        { min: 253, max: 273 },
        { min: 215, max: 235 },
        { min: 243, max: 263 },
        { min: 173, max: 193 },
        { min: 216, max: 236 },
      ];

      let cardsPlayedArray = functions.generateNumbersArray(cards, 1);

      socket.emit("heartStoneCardsPlayed", cardsPlayedArray);
    }, 2400);
  });
  return router;
};
