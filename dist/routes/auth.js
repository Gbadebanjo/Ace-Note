"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controller/user");
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtsecret = process.env.JWT_SECRET;
// users registration
router.post("/register", user_1.register);
// users login
router.post("/login", user_1.login);
//google login
router.get("/auth/google", passport_1.default.authenticate("google", {
    scope: ["profile", "email"],
}));
//Call back for google to redirect to
router.get("/auth/google/redirect", passport_1.default.authenticate("google"), (req, res) => {
    // res.redirect("/users/dashboard");
    //give user a token after successful login
    // res.send(req.user);
    const id = req.user.id;
    const expiresIn = 3 * 60 * 60; //seconds
    const token = jsonwebtoken_1.default.sign({ id, isAdmin: req.user.isAdmin }, jwtsecret, {
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
});
//users logout
router.get("/users/dashboard/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/login");
});
exports.default = router;
