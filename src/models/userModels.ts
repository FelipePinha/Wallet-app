import { prisma } from "../lib/prismaClient"

interface User {
    name: string
    email: string
    passwordHash: string
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