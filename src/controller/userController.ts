import { Request, Response } from 'express'
import { createNewUser } from '../models/userModels'
import bcrypt from 'bcrypt'

export const createUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body

    const passwordHash = await bcrypt.hash(password, 10)

     const user = await createNewUser({
        name,
        email,
        passwordHash
     })

     const {password: _, ...newUser} = user

     res.json({message: "Usuário criado com sucesso.", newUser})
}