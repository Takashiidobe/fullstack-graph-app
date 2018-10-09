const express = require("express");
const app = express();
const data = require("./sampleData.json");

app.get("/api", (req, res) => {
  res.sendFile(data);
});
