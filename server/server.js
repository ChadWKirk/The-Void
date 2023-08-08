const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");

app.use(cors());

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get("/", (req, res) => {
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});

app.get("/api/test", (req, res) => {
  console.log("testing 1 2 3");
});
