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
exports.deleteNote = exports.updateNote = exports.getAllNotes = exports.addNote = void 0;
const uuid_1 = require("uuid");
const note_1 = require("../model/note");
//Create note request
function addNote(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = (0, uuid_1.v4)();
        const { title, description, dueDate, status } = req.body;
        const newNote = yield note_1.Note.create({
            id,
            title,
            description,
            dueDate,
            status,
        });
        res.status(201).json({
            data: {
                newNote,
            },
        });
    });
}
exports.addNote = addNote;
// Read note request
function getAllNotes(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let allNote = yield note_1.Note.findAll();
        res.status(201).json({
            data: {
                allNote,
            },
        });
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
            yield note.save();
            return res.redirect(200, `/note/${id}`);
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
        const id = req.params.id;
        const note = yield note_1.Note.findOne({ where: { id: id } });
        if (note) {
            yield note.destroy();
            res.json({ msg: "Note deleted" });
        }
        else {
            res.status(404).send("Note not found");
        }
    });
}
exports.deleteNote = deleteNote;
