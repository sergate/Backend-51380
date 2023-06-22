import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import passport from "passport";
import initPassport from "./config/passport.config.js"

import viewsRouter from "./routes/views.routes.js";
import sessionRouter from "./routes/session.routes.js";

import dotenv from 'dotenv';
dotenv.config();

mongoose.set("strictQuery", false); // Quita el warning

const app = express();
const port = 8080;

const { MONGO_URL } = process.env;

mongoose.connect(MONGO_URL);

app.use(session({
    store: MongoStore.create({
        mongoUrl: MONGO_URL,
        mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
        ttl: 3000
    }),
    secret: "secretCoder",
    resave: false,
    saveUnitialized: true
}))

app.use(passport.initialize());

initPassport();

app.use(passport.session({
    secret: "S3cretCod3r"
}))

app.engine("handlebars", handlebars.engine());

app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

app.use('/', viewsRouter);
app.use('/api/session', sessionRouter);

const httpServer = app.listen(port, () => console.log(`Listening on port ${port}`));