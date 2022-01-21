import express from "express";
import { Client } from "../entities/Client";


const router = express.Router()

router.post("/api/client", async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        balance,
        cardNumber
    } = req.body

    const client = Client.create({
        first_name: firstName,
        last_name: lastName,
        email,
        balance,
        card_number: cardNumber
    })

    await client.save()

    return res.json(client)
})

export {
    router as createClientRouter
}

// {
//     "first_name": "Nikhil",
//     "last_name": "Gudla",
//     "email": "nikhil@gmail.com",
//     "card_number": "1234567890",
//     "balance": 0,
//     "additional_info": null,
//     "id": 1,
//     "is_active": true,
//     "family_members": [
//         "[]"
//     ],
//     "create_at": "2022-01-21T13:58:45.028Z",
//     "updated_at": "2022-01-21T13:58:45.028Z"
// }