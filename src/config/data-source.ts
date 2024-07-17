import { DataSource } from 'typeorm'
import { connString } from './conn-string.js'

export const AppDataSource = new DataSource(connString)
