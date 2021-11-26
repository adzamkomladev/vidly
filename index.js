const Joi = require("joi");
const express = require("express");

const app = express();

app.use(express.json());

let genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Comedy" },
];

app.get("/api/genres", (req, res) => res.send(genres));

app.post("/api/genres", (req, res) => {
  const { error } = validateBody(req.body);

  if (error) return res.status(422).send(error.details[0].message);

  if (
    genres.find((g) => g.name.toLowerCase() === req.body.name?.toLowerCase())
  ) {
    return res.status(400).send("Genre already exists");
  }

  const genre = { id: genres.length + 1, name: req.body.name };
  genres.push(genre);

  res.status(201).send(genre);
});

app.get("/api/genres/:id", (req, res) => {
  const genre = genres.find((g) => g.id === +req.params.id);

  if (!genre) {
    return res.status(404).send("Genre not found");
  }

  res.send(genre);
});

app.put("/api/genres/:id", (req, res) => {
  const genre = genres.find((g) => g.id === +req.params.id);

  if (!genre) {
    return res.status(404).send("Genre not found");
  }

  const { error } = validateBody(req.body);

  if (error) return res.status(422).send(error.details[0].message);

  genres = genres.map((g) => {
    if (g.id === genre.id) {
      return { ...g, name: req.body.name };
    }
    return g;
  });

  res.status(204).send("Genre updated successfully");
});

app.delete("/api/genres/:id", (req, res) => {
  const genre = genres.find((g) => g.id === +req.params.id);

  if (!genre) {
    return res.status(404).send("Genre not found");
  }

  genres = genres.filter((g) => g.id !== genre.id);

  res.status(204).send("Genre deleted successfully");
});

const validateBody = (body) => {
  return Joi.object({
    name: Joi.string().min(3).max(50).required(),
  })?.validate(body);
};

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Vidly listening on port ${port}!`));
