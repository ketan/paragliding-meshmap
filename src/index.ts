import bodyParser from 'body-parser'
import express, { Request, Response } from 'express'
import { AppDataSource } from './data-source.js'
import Node from './entity/node.js'

await AppDataSource.initialize()

const app = express()
app.use(bodyParser.json())

app.get('/api/nodes', async function (_req: Request, res: Response) {
  res.json(await AppDataSource.manager.find(Node))
})

app.listen(3333)

console.log('Express server has started on port 3333. Open http://localhost:3333/ to see results')
