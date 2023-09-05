"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passportSetup = void 0;
// import session from "express-session";
const passport_1 = __importDefault(require("passport"));
const user_1 = require("../model/user");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const uuid_1 = require("uuid");
const passportSetup = () => {
    passport_1.default.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/redirect",
    }, (accessToken, refreshToken, profile, done) => {
        try {
            //Check if user already exists in our db with the given profile ID
            user_1.User.findOne({ googleId: profile.id }).then((currentUser) => {
                if (currentUser) {
                    //if we already have a record with the given profile ID
                    done(null, currentUser);
                }
                else {
                    //if not, create a new user
                    new user_1.User({
                        username: profile.displayName,
                        email: profile.emails[0].value,
                        googleId: profile.id,
                        isAdmin: false,
                        id: (0, uuid_1.v4)(),
                    })
                        .save()
                        .then((newUser) => {
                        console.log("new user created: " + newUser);
                    });
                }
            });
        }
        catch (error) {
            console.error("Error during Google OAuth authentication:", error);
            done(error, null);
        }
    }));
};
exports.passportSetup = passportSetup;
