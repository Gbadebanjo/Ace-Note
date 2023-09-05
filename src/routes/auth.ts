import express, { Request, Response, NextFunction } from "express";
import { register, login } from "../controller/user";
import passport from "passport";
const router = express.Router();

// users registration
router.post("/register", register);

// users login
router.post("/login", login);

//google login
router.get("/auth/google", passport.authenticate("google", {
   scope: ["profile", "email"]
   }));

//Call back for google to redirect to
router.get('/auth/google/redirect', passport.authenticate('google'), (req, res) => {
  res.send('you reached the redirect URI');
});

//users logout
router.get("/users/dashboard/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});

export default router;
