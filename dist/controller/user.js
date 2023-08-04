"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deleteUser = exports.login = exports.displayAllUsers = exports.signup = void 0;
const user_1 = require("../model/user");
const uuid_1 = require("uuid");
function signup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = (0, uuid_1.v4)();
        const { username, email, password } = req.body;
        const newUser = yield user_1.User.create({
            id,
            username,
            email,
            password,
        });
        console.log(newUser);
        res.status(201).json({
            data: {
                newUser,
            }
        });
    });
}
exports.signup = signup;
function displayAllUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let allUsers = yield user_1.User.findAll();
        res.status(201).json({
            data: {
                allUsers,
            }
        });
    });
}
exports.displayAllUsers = displayAllUsers;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const foundUser = yield user_1.User.findByPk(id);
        (foundUser) ? res.send(foundUser) : res.status(404).send('User not found');
    });
}
exports.login = login;
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const user = yield user_1.User.findOne({ where: { id: id } });
        if (user) {
            yield user.destroy();
            res.json({ msg: "User deleted" });
        }
        else {
            res.status(404).send("User not found");
        }
    });
}
exports.deleteUser = deleteUser;
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const user = yield user_1.User.findOne({ where: { id: id } });
        const updates = req.body;
        if (user) {
            Object.assign(user, Object.assign(Object.assign({}, user), updates));
            yield user.save();
            return res.redirect(200, `/user/${id}`);
        }
        else {
            res.json({ msg: "User not found" });
        }
    });
}
exports.updateUser = updateUser;
