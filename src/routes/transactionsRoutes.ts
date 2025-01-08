import { Router } from "express";
import { createTransaction } from "../controller/transactionsController";

export const transactionsRouter = Router()

transactionsRouter.post('/transaction/:walletId', createTransaction)