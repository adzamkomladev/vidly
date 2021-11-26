const express = require("express");

const app = express();

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Comedy" },
];

app.get("/api/genres", (req, res) => res.send(genres));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Vidly listening on port ${port}!`));