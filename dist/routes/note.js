"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const note_1 = require("../controller/note");
const router = express_1.default.Router();
//Create note
router.post('/', note_1.addNote);
/* GET home page. */
router.get('/', note_1.getAllNotes);
//   res.render('index', { title: 'Express' });
router.put('/:id', note_1.updateNote);
router.delete('/:id', note_1.deleteNote);
exports.default = router;
