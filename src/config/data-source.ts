// load .env file
import 'dotenv-flow/config'

// then load everything else
import { globSync } from 'glob'
import os from 'os'
import path from 'path'
import pluralize from 'pluralize'
import 'reflect-metadata'
import { DataSource, DefaultNamingStrategy, NamingStrategyInterface, Table } from 'typeorm'
import { DataSourceOptions } from 'typeorm/browser'
import { fileURLToPath } from 'url'
import { dbConnectionOptions } from '#config/db-connection-opts-parser'
import _ from 'lodash'
import { DateTime } from 'luxon'

// https://github.com/trancong12102/typeorm-naming-strategies/blob/master/src/postgres-naming.strategy.ts
class SnakeNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
  tableName(targetName: string, userSpecifiedName: string | undefined): string {
    if (userSpecifiedName) {
      return userSpecifiedName
    }

    return _.snakeCase(pluralize.plural(targetName))
  }

  columnName(propertyName: string, customName: string, embeddedPrefixes: string[]): string {
    return _.snakeCase(super.columnName(propertyName, customName, embeddedPrefixes))
  }

  indexName(tableOrName: Table | string, columnNames: string[], _where?: string): string {
    const clonedColumnNames = [...columnNames]
    clonedColumnNames.sort()
    const tableName = this.getTableName(tableOrName)
    const replacedTableName = tableName.replace('.', '_')
    return  `${replacedTableName}_${clonedColumnNames.join('_')}_idx`
  }
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const dbUrl = process.env.DATABASE_URL || `sqlite:///${__dirname}/../../tmp/paragliding-meshmap.sqlite3`

const { dbConnectionOpts, driver } = dbConnectionOptions(dbUrl)

export const connString = <DataSourceOptions>{
  ...dbConnectionOpts,
  namingStrategy: new SnakeNamingStrategy(),
  type: driver,
  synchronize: false,
  logging: 'all',
  logger: 'debug',
  entities: globSync(`${__dirname}/../entity/**/*.{ts,js,tsx}`, { ignore: '**/base_type.{ts,js}' }),
  migrations: [`${__dirname}/../migration/*.ts`, `${__dirname}/../migration/*.js`],
  migrationsTransactionMode: 'each',
  subscribers: [],
  parseInt8: true, // https://github.com/typeorm/typeorm/issues/8583
}

export const dbConnectionConcurrency =
  connString.type === 'sqlite' || connString.type === 'better-sqlite3'
    ? 1
    : Number(process.env.DB_CONNECTION_CONCURRENCY) || os.cpus().length

console.log(`Using connection parameters`, connString)
console.log(`Using connection concurrency`, dbConnectionConcurrency)
console.log(`Timezone is ${process.env.TZ}`)
console.log(`System time is ${DateTime.now().toString()}`)
console.log(`Local time is ${DateTime.local().toString()}`)
console.log(`new Date is ${new Date().toISOString()}`)
export const AppDataSource = new DataSource(connString)
