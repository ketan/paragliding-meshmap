import { connString } from '#config/conn-string'
import _ from 'lodash'
import path from 'path'
import parseDatabaseUrl from 'ts-parse-database-url'
import { DataSource } from 'typeorm'
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions.js'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const dbConnectionOpts = parseDatabaseUrl.default(process.env.DB_URL || `sqlite:///${__dirname}/../../tmp/paragliding-meshmap.sqlite3`)

let driver = dbConnectionOpts.driver
if (driver === 'postgresql') {
  driver = 'postgres'
}
if (driver === 'sqlite3') {
  driver = 'sqlite'
}

export const testDbFile = `${__dirname}/../tmp/test.db`
const testConnString = _.merge(connString, <SqliteConnectionOptions>{
  type: 'sqlite',
  database: testDbFile,
})

export const TestDataSource = new DataSource(testConnString)
