"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controller/user");
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
// users registration
router.post("/register", user_1.register);
// users login
router.post("/login", user_1.login);
//google login
router.get("/auth/google", passport_1.default.authenticate("google", {
    scope: ["profile", "email"]
}));
//Call back for google to redirect to
router.get('/auth/google/redirect', passport_1.default.authenticate('google'), (req, res) => {
    res.send('you reached the redirect URI');
});
//users logout
router.get("/users/dashboard/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/login");
});
exports.default = router;
