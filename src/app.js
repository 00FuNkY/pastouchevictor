const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const expressJSDocSwagger = require('express-jsdoc-swagger');
require('dotenv').config();

// eslint-disable-next-line no-unused-vars
const { jwtDecode, checkIfRoleIs } = require('./middlewares');

const swaggerOptions = require('./swaggerOptions');
const middlewares = require('./middlewares');

// routes
const routes = require('./routes');
const auth = require('./routes/AuthRoute');

const app = express();

// création du fichier de documentation
expressJSDocSwagger(app)(swaggerOptions);

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/v1', auth);

app.use(jwtDecode);
/* app.use(checkIfRoleIs('ADMIN')); */

app.use('/api/v1', routes);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
