import { Router } from "express";
import { createTransaction, listWalletTransactions } from "../controller/transactionsController";

export const transactionsRouter = Router()

transactionsRouter.get('/transaction/:walletId', listWalletTransactions)
transactionsRouter.post('/transaction/:walletId', createTransaction)