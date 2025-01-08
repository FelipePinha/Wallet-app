import { prisma } from "../lib/prismaClient"

interface CreateTransactionProps {
    amount: number
    type: string
    walletId: string
    wallet: {
        id: string;
        balance: number;
        userId: string;
    }
}

export const createNewTransaction = async ({amount, type, walletId, wallet}: CreateTransactionProps) => {
    const transaction = await prisma.transaction.create({
        data: {
            amount,
            type,
            walletId
        }
    })

    const newBalance = type.toLowerCase() === 'deposit' ? wallet.balance + amount : wallet.balance - amount

    await prisma.wallet.update({
        data: {
            balance: newBalance
        },
        where: {
            id: walletId
        }
    })

    return transaction
}