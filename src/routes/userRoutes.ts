import { Router } from "express";
import { createUser, loginUser } from "../controller/userController";
import { validateUserCreation } from "../middleware/createUserMiddleware";
import { validateUserLogin } from "../middleware/loginUserMiddleware";

export const userRouter = Router()

userRouter.post('/user', validateUserCreation, createUser)
userRouter.post('/login', validateUserLogin, loginUser)