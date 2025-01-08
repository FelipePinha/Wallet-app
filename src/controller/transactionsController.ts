import { Request, Response } from 'express'
import { prisma } from '../lib/prismaClient'
import { createNewTransaction } from '../models/transactionModels'

export const createTransaction = async (req: Request, res: Response) => {
    const { walletId } = req.params
    const { amount, type } = req.body

    const wallet = await prisma.wallet.findUnique({
        where: {
            id: walletId
        }
    })

    if(!wallet) {
        res.status(400).json({message: 'wallet not found'})
        return
    }

    if(type.toLowerCase() === 'withdraw' && amount > wallet.balance) {
        res.status(401).json({message: 'Insufficient balance'})
        return
    }

    const transactionResponse = await createNewTransaction({amount, type, walletId, wallet})

    res.json(transactionResponse)
}