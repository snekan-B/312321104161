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

const calculateAverage = (numbers) => {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return (sum / numbers.length).toFixed(2);
};

// Route to handle numbers/{numberid}
app.get("/numbers/:numberid", async (req, res) => {
  const { numberid } = req.params;
  const newNumbers = await NumberValues(numberid);
  const prevWindowState = updateWindow(newNumbers);
  const avg = calculateAverage(windowNumbers);

  const response = {
    numbers: newNumbers,
    windowPrevstate: prevWindowState,
    windowCurrstate: windowNumbers,
    avg,
  };

  res.json(response);
});

app.listen(PORT, () => {
  console.log(`Average Calculator Microservice running on port ${PORT}`);
});
