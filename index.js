const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require("express");
const debug = require('debug')('vidly:startup');
const mongoDebug = require("debug")("vidly:db:mongo");

const mongoose = require("mongoose");

// Make DB connection
mongoose
  .connect(config.get("db.mongodb"))
  .then(() => mongoDebug("Connected to MongoDB..."))
  .catch((err) => mongoDebug("Error connecting to MongoDB: ", err));

// Routes
const genres = require("./routes/genres");

const app = express();

app.use(helmet());

if (app.get('env') === 'development') {
    app.use(morgan('dev'));
}
app.use(express.json());

app.use('/api/genres', genres);

const port = config.get('port') || process.env.PORT;
app.listen(port, () => debug(`Vidly listening on port ${port}...`));
