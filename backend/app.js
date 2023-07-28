const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const router = require('./routes');
const UnknowError = require('./middlewares/unknow-error');
const { PORT, DATA_BASE_URI } = require('./config');

const app = express();

mongoose.connect(DATA_BASE_URI);

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(router);
app.use(errors());
app.use(UnknowError);

app.listen(PORT, () => console.log('Сервер запущен'));
