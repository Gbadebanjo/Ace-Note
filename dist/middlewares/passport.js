"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passportSetup = void 0;
const passport_1 = __importDefault(require("passport"));
const user_1 = require("../model/user");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const uuid_1 = require("uuid");
// serialize user
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
// deserialize user
passport_1.default.deserializeUser((id, done) => {
    user_1.User.findByPk(id).then((user) => {
        done(null, user);
    });
});
const passportSetup = () => {
    passport_1.default.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/redirect",
    }, (accessToken, refreshToken, profile, done) => {
        try {
            //Check if user already exists in our db with the given profile ID
            user_1.User.findOne({ where: { googleId: profile.id } }).then((currentUser) => {
                if (currentUser) {
                    //if we already have a record with the given profile ID
                    done(null, currentUser);
                    console.log("user is: ", currentUser);
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
                        done(null, newUser);
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
