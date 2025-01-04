import { Router } from "express";
import { createUser, loginUser } from "../controller/userController";
import { validateUser, registerSchema, loginSchema } from "../middleware/authMiddleware";

export const userRouter = Router()

userRouter.post('/user', validateUser(registerSchema), createUser)
userRouter.post('/login', validateUser(loginSchema), loginUser)