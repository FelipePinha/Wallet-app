import z, { ZodError, ZodSchema } from "zod";
import { Request, Response, NextFunction } from 'express'

export const registerSchema = z.object({
    name: z.string().min(1, "O nome é obrigatório."),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
    passwordConfirmation: z.string(),
}).refine(data => data.password === data.passwordConfirmation, {
    message: 'As senhas devem ser iguais',
    path: ["passwordConfirmation"]
})

export const loginSchema = z.object({
    email: z.string().email("Email inválido"),
    password: z.string(),
})


export const validateUser = (schema: ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body)
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
}