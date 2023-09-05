import express from "express";
// import session from "express-session";
import passport from "passport";
import { User } from "../model/user";
const GoogleStrategy = require("passport-google-oauth20").Strategy;
import { v4 as uuidv4 } from "uuid";

export const passportSetup = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/redirect",
      },
      (accessToken: any, refreshToken: any, profile: any, done: any) => {
        try {
        //Check if user already exists in our db with the given profile ID
        User.findOne({ googleId: profile.id }).then((currentUser) => {
            if (currentUser) {
                //if we already have a record with the given profile ID
                done(null, currentUser);
                
            } else {
                //if not, create a new user
         new User({
          username: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,
          isAdmin: false,
          id: uuidv4(),
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
        
      }
    )
  );
};
