import express from 'express'
import { Banker } from '../entities/Banker'
import { Client } from '../entities/Client'

const router = express.Router()

router.put("/api/banker/:bankerId/client/:clientId", async (req, res) => {
    const { clientId, bankerId } = req.params

    const client = await Client.findOne(parseInt(clientId))
    const banker = await Banker.findOne(parseInt(bankerId))

    if (!client || !banker) {
        return res.json({
            msg: "Banker or Client not exist"
        })
    }

    banker.clients = [client]

    banker.save()

    return res.json({
        msg: `Banker connected to Client`
    })

})

export {
    router as connectBankerToClientRouter
}