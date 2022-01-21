import express from "express";
import { Banker } from "../entities/Banker";


const router = express.Router()

router.post("/api/banker", async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        employeeNumber,
        cardNumber
    } = req.body

    const banker = Banker.create({
        first_name: firstName,
        last_name: lastName,
        email,
        employee_number: employeeNumber,
        card_number: cardNumber
    })

    await banker.save()

    return res.json(banker)
})

export {
    router as createBankerRouter
}

// {
//     "first_name": "Nikhil",
//     "last_name": "Gudla",
//     "email": "nikhil@gmail.com",
//     "card_number": "1234567890",
//     "employee_number": "1234567890",
//     "id": 2,
//     "create_at": "2022-01-21T14:05:45.903Z",
//     "updated_at": "2022-01-21T14:05:45.903Z"
// }