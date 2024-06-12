//importing express library
const express = require("express");

const app = express();
const PORT = 3000;

const WINDOW_SIZE = 10;

let windowNumbers = [];

//sample data for fetching numbers in API
const NumberValues = async (numberId) => {
  const numberData = {
    e: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
    f: [1, 1, 2, 3, 5, 8, 13, 21, 34, 55],
    p: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29],
    r: [6, 8, 10, 12, 14, 16, 18, 26, 22, 24, 26, 28, 30],
  };
  return numberData[numberId] || [];
};

//method to update the window
const updateWindow = (newNumbers) => {
  const uniqueNewNumbers = [...new Set(newNumbers)];
  const prevWindowState = [...windowNumbers];

  uniqueNewNumbers.forEach((num) => {
    if (!windowNumbers.includes(num)) {
      if (windowNumbers.length >= WINDOW_SIZE) {
        windowNumbers.shift();
      }
      windowNumbers.push(num);
    }
  });

  return prevWindowState;
};

app.listen(PORT, () => {
  console.log(`Average Calculator Microservice running on port ${PORT}`);
});
