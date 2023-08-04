"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controller/user");
const router = express_1.default.Router();
/* GET users listing. */
router.get("/", user_1.displayAllUsers);
router.post("/", user_1.signup);
router.get('/:id', user_1.login);
router.delete('/:id', user_1.deleteUser);
router.put('/:id', user_1.updateUser);
exports.default = router;
