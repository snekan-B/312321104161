//importing express library
const express = require("express");

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Average Calculator Microservice running on port ${PORT}`);
});
