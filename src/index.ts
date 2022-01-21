import { createConnection } from 'typeorm'
import express from 'express'
import { Banker } from './entities/Banker'
import { Client } from './entities/Client'
import { Transaction } from './entities/Transaction'
import { createClientRouter } from './routes/create_Client'
import { createBankerRouter } from './routes/create_banker'
import { createTransactionRouter } from './routes/create_transaction'
import { connectBankerToClientRouter } from './routes/connect_banker_to_client'
import { deleteClientRouter } from './routes/delete_client'
import { fetchClientsRouter } from './routes/fetch_clients'

const app = express()

const main = async () => {
    try {
        await createConnection({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: 'nikhil',
            password: 'nikhil',
            database: 'dbforall',
            entities: [Client, Banker, Transaction],
            synchronize: true

        })
        console.log('Connected to Postgres')

        app.use(express.json())
        app.use(createClientRouter)
        app.use(createBankerRouter)
        app.use(createTransactionRouter)
        app.use(connectBankerToClientRouter)
        app.use(deleteClientRouter)
        app.use(fetchClientsRouter)

        app.listen(8081, () => {
            console.log("Listening on port: 8081")
        })
    } catch (error) {
        console.log(error)
        throw new Error("'Unable to connect to Postgres'")
    }
}

main()