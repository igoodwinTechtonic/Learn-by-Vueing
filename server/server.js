const express = require('express');
const cors = require('cors');
const { join } = require("path");
const logger = require('morgan');

const routes = require('./routes');

const app = express();

const corsOptions = { origin: 'http://localhost:8080' };
const PORT = process.env.PORT || 3001;

app.use(logger('dev'))
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, "dist")));

app.use(routes);

app.listen(PORT, () => console.log('API Server listening on port http://localhost:' + PORT));
