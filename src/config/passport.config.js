import passport from "passport";
import local from "passport-local";
import userModel from "../dao/models/user.js";
import {createHash, isValidPassword} from "../utils.js";
import userService from 'passport-github2';
import dotenv from "dotenv";
dotenv.config();

const localStrategy = local.Strategy;
const initPassport = () => {

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async(id, done) => {
        let user = await userModel.findById(id)
        done(null, user);
    });

    passport.use('github', new userService({
        clientID: "47bf90fd528dcb3ddd5d",
        clientSecret: "9ca962d8892c794db56e42d0689ddf4847b3bb23",
        callbackURL: "http://localhost:8080/api/session/githubcallback"
    }, async(req, accessToken, refreshToken, profile, done) => {
        // let {password = "10"} = req.body;
        let password = "10"
        try {
            let user = await userModel.findOne({email: profile._json.email});
            if (!user) {
                let newUser = {
                    first_name: profile._json.name,
                    last_name: profile._json.last_name || "Silva Coelho",
                    age: 18,
                    email: profile._json.email,
                    password: createHash(password)
                }
                let result = await userModel.create(newUser);
                done(null, result);
            } else {
                done(null, user);
            }
        } catch(error) {
            return done(error); 
        }
    }))

    passport.use('register', new localStrategy(
        {passReqToCallback: true, usernameField: 'email'}, async(req, something, username, done) => {
            const {first_name, last_name, age, email, password} = req.body;
            try {
                let user = await userModel.findOne({email: email});
                if (user != null) {
                    console.log("El usuario ya existe");
                    return done(null, false);
                }

                const result = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password)
                }

                let newUser = await userModel.create(result);

                return done(null, newUser);
            } catch(error) {
                done(error)
            }
        }
    ))

    passport.use('login', new localStrategy(
        {passReqToCallback: true, usernameField: 'email'}, async(req, something, password, done) => {
            const {email} = req.body;
            try {
                const user = await userModel.findOne({email: email})
                if (!user) {
                    console.log("El usuario no existe");
                    return done(null, false);
                }

                if (!isValidPassword(user, password)) return done(null, false);

                console.log("Entre")
                return done(null, user);
            } catch(error) {
                return done("Oops")
            }
        }
    ))
}

export default initPassport;