import express, { Request, Response, NextFunction, request } from "express";
import { v4 as uuidv4 } from "uuid";
import { Note } from "../model/note";

//Create note request
export async function addNote(req: Request, res: Response) {
  const id = uuidv4();
  const { title, description, dueDate, status } = req.body;

  const newNote = await Note.create({
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
}

// Read note request
export async function getAllNotes(req: Request, res: Response) {
  let allNote = await Note.findAll();
  res.status(201).json({
    data: {
      allNote,
    },
  });
}

// Update note request
export async function updateNote(req: Request, res: Response) {
  const id = req.params.id;
  const note = await Note.findOne({ where: { id: id } });
  const update = req.body;

  if (note) {
    Object.assign(note, { ...note, ...update });
    await note.save();
    return res.redirect(200, `/note/${id}`);
  } else {
    res.json({ msg: "Note not found" });
  }
}

// Delete request
export async function deleteNote(req: Request, res: Response) {
  const id = req.params.id;
  const note = await Note.findOne({ where: { id: id } });
  if (note) {
    await note.destroy();
    res.json({ msg: "Note deleted" });
  } else {
    res.status(404).send("Note not found");
  }
}
