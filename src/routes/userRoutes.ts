import { Router } from "express";
import { createUser } from "../controller/userController";
import { validateUserCreation } from "../middleware/createUserMiddleware";

export const userRouter = Router()

userRouter.post('/user', validateUserCreation, createUser)