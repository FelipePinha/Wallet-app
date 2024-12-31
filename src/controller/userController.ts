import { Request, Response } from 'express'
import { createNewUser, login } from '../models/userModels'
import bcrypt from 'bcrypt'
import { prisma } from '../lib/prismaClient'

export const createUser = async (req: Request, res: Response) => {
   const { name, email, password } = req.body

   const userExists = await prisma.user.findFirst({
      where: {
         email
      }
   })

   if(userExists) {
   res.status(400).json({message: "Já existe um usuário com esse email."})
   }

   const passwordHash = await bcrypt.hash(password, 10)

   const user = await createNewUser({
      name,
      email,
      passwordHash
   })

   const {password: _, ...newUser} = user

   res.json({message: "Usuário criado com sucesso.", newUser})
}

export const loginUser = async (req: Request, res: Response) => {
   const { email, password } = req.body

   const user = await prisma.user.findFirst({
      where: {
         email
      }
   })

   if(!user) {
      res.status(400).json({message: "email ou senha incorretos."})
      return
   }

  const verifyPass = await bcrypt.compare(password, user.password)

   if(!verifyPass) {
      res.status(400).json({message: "email ou senha incorretos."})
      return
   }

   const data = await login(user)

   res.status(data.status).json(data)
}