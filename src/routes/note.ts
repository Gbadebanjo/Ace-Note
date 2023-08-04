import express, { Request, Response, NextFunction} from 'express';
import { addNote, deleteNote, getAllNotes, updateNote } from '../controller/note';
const router = express.Router();

//Create note
router.post('/', addNote );
/* GET home page. */
router.get('/', getAllNotes );
//   res.render('index', { title: 'Express' });

router.put('/:id', updateNote )

router.delete('/:id', deleteNote)

export default router;