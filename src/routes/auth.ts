import express from "express";
import { register, login } from "../controller/user";
import passport from "passport";
const router = express.Router();
import jwt from "jsonwebtoken";
const jwtsecret = process.env.JWT_SECRET as string;

// users registration
router.post("/register", register);

// users login
router.post("/login", login);

//google login
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

//Call back for google to redirect to
router.get(
  "/auth/google/redirect",
  passport.authenticate("google"),
  (req, res) => {
    // res.redirect("/users/dashboard");
    //give user a token after successful login
    // res.send(req.user);

    const id = req.user.id;
    const expiresIn = 3 * 60 * 60; //seconds
    const token = jwt.sign({ id, isAdmin: req.user.isAdmin }, jwtsecret, {
      expiresIn,
    });

    //save token as a cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: expiresIn * 1000, // in milliseconds
    });

    console.log(req.cookies);
    // return res.json({message: 'login', user, token})
    return res.redirect("/users/dashboard");
  }
);

//users logout
router.get("/users/dashboard/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});

export default router;
