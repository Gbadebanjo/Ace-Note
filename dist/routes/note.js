"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
    res.send("respond with a resource from note");
    //   res.render('index', { title: 'Express' });
});
router.post('/', function (req, res, next) {
    res.send("respond with resource from note");
});
router.put('/', function (req, res, next) {
    res.send("respond with resource from note");
});
router.delete('/', function (req, res, next) {
    res.send("respond with resource from note");
});
exports.default = router;
