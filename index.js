const config = require('config');
const helmet = require('helmet');
const express = require("express");

// Routes
const genres = require("./routes/genres");

const app = express();

app.use(helmet());
app.use(express.json());

app.use('/api/genres', genres);

const port = config.get('port') || process.env.PORT;
app.listen(port, () => console.log(`Vidly listening on port ${port}!`));
