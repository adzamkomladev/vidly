const express = require("express");

const app = express();

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Comedy" },
];

app.get("/api/genres", (req, res) => res.send(genres));

app.get("/api/genres/:id", (req, res) => {
  const genre = genres.find((g) => g.id === +req.params.id);

  if (!genre) {
    return res.status(404).send("Genre not found");
  }
  
  res.send(genre);
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Vidly listening on port ${port}!`));
