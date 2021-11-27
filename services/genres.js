let genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Comedy" },
];

module.exports.findAll = () => genres;

module.exports.findOneById = (id) => genres.find((g) => g.id === id);

module.exports.create = (genre) => {
  if (genres.find((g) => g.name.toLowerCase() === genre.name.toLowerCase())) {
    return null;
  }

  const newGenre = { id: genres.length + 1, ...genre };
  genres.push(newGenre);
  return newGenre;
};

module.exports.update = (id, genre) => {
  const index = genres.findIndex((g) => g.id === id);

  if (index === -1) {
    return null;
  }

  genres[index] = { ...genres[index], ...genre };
  return genres[index];
};

module.exports.delete = (id) => {
  const index = genres.findIndex((g) => g.id === id);

  if (index === -1) {
    return null;
  }

  return genres.splice(index, 1);
};
