import { prisma } from "../lib/prismaClient"
import jwt from 'jsonwebtoken'

interface User {
    name: string
    email: string
    passwordHash: string
}

interface LoginUser extends Partial<User> {
    id: string
    password: string
}

export const createNewUser = async ({name, email, passwordHash}: User) => {
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: passwordHash
        }
    })

    return user
}

export const login = async (user: LoginUser) => {
    try {
        const jwtSecret = process.env.JWT_SECRET

        const token = jwt.sign({id: user.id}, jwtSecret ?? '', {expiresIn: "24h"})

        const {password, ...loggedUser} = user

        return {
            loggedUser,
            token,
            status: 200
        }
    } catch (error) {
        console.log(error)
        
        return {
            status: 400,
            message: "Ocorreu um erro no servidor."
        }
    }
}