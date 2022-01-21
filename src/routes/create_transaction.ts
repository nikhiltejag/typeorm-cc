import express from 'express'
import { Client } from '../entities/Client'
import { Transaction, TransactionTypes } from '../entities/Transaction'

const router = express.Router()

router.post("/api/client/:clientId/transaction", async (req, res) => {
    const { clientId } = req.params

    const { type, amount } = req.body

    const client = await Client.findOne(parseInt(clientId))

    if (!client) {
        return res.json({
            msg: "Client Does not exist"
        })
    }

    const transaction = Transaction.create({
        type,
        amount,
        client
    })

    await transaction.save()

    if (type === TransactionTypes.DEPOSIT) {
        client.balance = client.balance + amount
    } else if (type === TransactionTypes.WITHDRAW) {
        client.balance = client.balance - amount
    }

    client.save()

    return res.json({
        msg: `Transaction successfull with ID: ${transaction.id}`
    })

})

export {
    router as createTransactionRouter
}