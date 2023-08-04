import express, { Request, Response, NextFunction } from "express";
import { User } from "../model/user";
import { v4 as uuidv4 } from "uuid";
import { signup , deleteUser, displayAllUsers, login, updateUser } from "../controller/user";

const router = express.Router();

/* GET users listing. */
router.get("/", displayAllUsers);

router.post("/", signup);

router.get('/:id', login);


router.delete('/:id', deleteUser)

router.put('/:id', updateUser)
  
  
export default router;
