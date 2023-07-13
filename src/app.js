const express = require('express');
const { Server } = require('socket.io');
const { connectionSocket } = require('./utils/soket.io');
const handlebars = require('express-handlebars');
const router = require('./routes/index.router');
const server = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const FileStore = require('session-file-store');
const mongoconnect = require('connect-mongo');
const mongoose = require('mongoose');
const productModel = require('./dao/models/products.model');
const { PORT } = require('./utils/constants');
const { init } = require('./dao/models/users.model');
const { initPassaport } = require('./utils/passport.config');
const passport = require('passport');

mongoose.set('strictQuery', false);

const FileStorage = FileStore(session);
const httpServer = server.listen(8080, () => {
  console.log(PORT);
});

//handlerbars
server.engine('handlebars', handlebars.engine());
server.set('views', __dirname + '/views');
server.set('view engine', 'handlebars');

//cokiers
server.use(cookieParser());

//express
server.use(express.static(__dirname + '/public'));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(
  session({
    store: mongoconnect.create({
      mongoUrl: 'mongodb+srv://Ignacio:jY6DHRTn6F9uCAmF@admin.mtszt8r.mongodb.net/?retryWrites=true&w=majority',
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 60 * 60,
    }),
    secret: 'secretCode',
    resave: true,
    saveUninitialized: true,
  })
);

initPassaport();
server.use(passport.initialize());
server.use(passport.session());

//rutas

server.use('/', router);

const test = async () => {
  await mongoose.connect('mongodb+srv://Ignacio:jY6DHRTn6F9uCAmF@admin.mtszt8r.mongodb.net/?retryWrites=true&w=majority');
  console.log('Su conexion a la base fue exitosa');
};

test();
connectionSocket(httpServer);
