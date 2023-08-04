import express, { Request, Response, NextFunction } from "express";
import { User } from "../model/user";
import { v4 as uuidv4 } from "uuid";

export async function signup (req: Request, res: Response) {
    const id = uuidv4();
    const { username, email, password } = req.body
  
    const newUser = await User.create({
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
}

export async function displayAllUsers (req: Request, res: Response) {
  let allUsers = await User.findAll()
    res.status(201).json({
      data: {
        allUsers,
      }
});
}

export async function login (req: Request,res: Response) {
  const  id  = req.params.id
  const  foundUser = await User.findByPk(id);
  (foundUser) ? res.send(foundUser) : res.status(404).send('User not found');
}

export  async function deleteUser (req: Request, res: Response) {
  const  id  = req.params.id;
  const user = await User.findOne({where: {id:id}});
  if (user) {
    await user.destroy();
    res.json({msg: "User deleted"})
  }
  else {
    res.status(404).send("User not found")
  }
}

export async function updateUser (req: Request, res: Response) {
const id = req.params.id;
const user = await User.findOne({where: {id:id}});
const updates = req.body

if (user) {
  Object.assign(user, { ...user,...updates });
  await user.save();
  return res.redirect(200, `/user/${id}`)
} else {
    res.json({msg: "User not found"} ) 
  }
}

