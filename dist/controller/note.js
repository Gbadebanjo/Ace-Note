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
exports.deleteNote = exports.updateNote = exports.getAllNotes = exports.createNote = exports.viewNote = void 0;
const uuid_1 = require("uuid");
const note_1 = require("../model/note");
function viewNote(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("calling viewNote function");
            // const note = await Note.findOne( { id: req.params })
            const note = yield note_1.Note.findByPk(req.params.id);
            if (note) {
                res.render("view-note", {
                    userId: note.dataValues.userId,
                    noteID: req.params.id,
                    note,
                    id: note.dataValues.id,
                    // layout: '../views/view-note',
                });
            }
            else {
                res.status(404).json({ message: "Note not found" });
            }
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
}
exports.viewNote = viewNote;
//Create note request
function createNote(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("calling createNote fxn");
        if (req.method === "GET")
            return res.render("create-note");
        try {
            // To get id of user creating note
            const verified = req.userKey;
            const id = (0, uuid_1.v4)();
            // const { title, description, dueDate, status } = req.body;
            const newNote = yield note_1.Note.create(Object.assign(Object.assign({ id }, req.body), { userId: verified.id }));
            return res.redirect("/users/dashboard");
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.createNote = createNote;
// Read note request
function getAllNotes(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let allNote = yield note_1.Note.findAll();
            // A more advance method to the above => let allNote = await Note.findAndCountAll();
            res.status(201).json({
                data: {
                    allNote,
                },
            });
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.getAllNotes = getAllNotes;
// Update note request
function updateNote(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const note = yield note_1.Note.findOne({ where: { id: id } });
        const update = req.body;
        if (note) {
            Object.assign(note, Object.assign(Object.assign({}, note), update));
            console.log("updated note: ", note);
            yield note.save();
            return res.redirect("/users/dashboard");
        }
        else {
            res.json({ msg: "Note not found" });
        }
    });
}
exports.updateNote = updateNote;
// Delete request
function deleteNote(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("calling delete");
        const id = req.params.id;
        const note = yield note_1.Note.findOne({ where: { id: id } });
        if (note) {
            yield note.destroy();
            res.redirect("/users/dashboard");
        }
        else {
            res.status(404).send("Note not found");
        }
    });
}
exports.deleteNote = deleteNote;
