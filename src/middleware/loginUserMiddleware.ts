import z, { ZodError } from "zod";
import { Request, Response, NextFunction } from 'express'

const loginSchema = z.object({
    email: z.string().email("Email inválido"),
    password: z.string(),
})

export const validateUserLogin = (req: Request, res: Response, next: NextFunction) => {
    try {
        loginSchema.parse(req.body)
        next()
    } catch (error) {
        if(error instanceof ZodError) {
            const errorMessages = error.errors.map((issue: any) => ({
                path: `${issue.path}`,
                message: `${issue.message}`
            }))
            res.status(400).json({ error: 'Invalid data', details: errorMessages });
        }

        res.status(400).json(error)
    }
}