const config = require('config');
const express = require("express");

// Routes
const genres = require("./routes/genres");

const app = express();

app.use(express.json());

app.use('/api/genres', genres);

const port = config.get('port') || process.env.PORT;
app.listen(port, () => console.log(`Vidly listening on port ${port}!`));
