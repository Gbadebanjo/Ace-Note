import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { Note } from "../model/note";

export async function viewNote(req: Request, res: Response) {
  try {
    console.log("calling viewNote function");

    // const note = await Note.findOne( { id: req.params })
    const note = await Note.findByPk(req.params.id);

    if (note) {
      res.render("view-note", {
        userId: note.dataValues.userId,
        noteID: req.params.id,
        note,
        id: note.dataValues.id,
        // layout: '../views/view-note',
      });
    } else {
      res.status(404).json({ message: "Note not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

//Create note request
export async function createNote(req: Request | any, res: Response) {
  console.log("calling createNote fxn");
  if (req.method === "GET") return res.render("create-note");
  try {
    // To get id of user creating note
    const verified = req.userKey;
    const id = uuidv4();
    // const { title, description, dueDate, status } = req.body;

    const newNote = await Note.create({
      id,
      //next line is the same as listing all the values in req.body but using the spread method makes the code more optimized.
      ...req.body,
      userId: verified.id,
    });

    return res.redirect("/users/dashboard");
  } catch (err) {
    console.log(err);
  }
}

// Read note request
export async function getAllNotes(req: Request, res: Response) {
  try {
    let allNote = await Note.findAll();
    // A more advance method to the above => let allNote = await Note.findAndCountAll();
    res.status(201).json({
      data: {
        allNote,
      },
    });
  } catch (err) {
    console.log(err);
  }
}

// Update note request
export async function updateNote(req: Request, res: Response) {
  const id = req.params.id;
  const note = await Note.findOne({ where: { id: id } });
  const update = req.body;

  if (note) {
    Object.assign(note, { ...note, ...update });
    console.log("updated note: ", note);
    await note.save();
    return res.redirect("/users/dashboard");
  } else {
    res.json({ msg: "Note not found" });
  }
}

// Delete request
export async function deleteNote(req: Request, res: Response) {
  console.log("calling delete");
  const id = req.params.id;
  const note = await Note.findOne({ where: { id: id } });
  if (note) {
    await note.destroy();
    res.redirect("/users/dashboard");
  } else {
    res.status(404).send("Note not found");
  }
}
