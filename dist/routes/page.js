"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
/* GET home page. */
// /
router.get('/', function (req, res, next) {
    res.render("Home");
});
// /register
router.get('/register', function (req, res, next) {
    res.render("Register");
});
// /login
router.get('/login', function (req, res, next) {
    res.render("Login");
});
// /about
router.get('/about', function (req, res, next) {
    res.render("About");
});
// /users/dashboard
router.get('users/dashboard', function (req, res, next) {
    console.log('calling get login');
    res.render("Dashboard");
});
//Handle 404
router.get('*', function (req, res) {
    res.status(404).render("404");
});
exports.default = router;
