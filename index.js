const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require("express");

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
app.listen(port, () => console.log(`Vidly listening on port ${port}!`));
