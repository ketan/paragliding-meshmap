import 'dotenv/config'
import snakeCase from 'lodash/snakeCase.js'
import path from 'path'
import pluralize from 'pluralize'
import 'reflect-metadata'
import parseDatabaseUrl from 'ts-parse-database-url'
import { DefaultNamingStrategy, NamingStrategyInterface } from 'typeorm'
import { DataSourceOptions } from 'typeorm/browser'
import { fileURLToPath } from 'url'

// https://github.com/trancong12102/typeorm-naming-strategies/blob/master/src/postgres-naming.strategy.ts
class SnakeNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
  tableName(targetName: string, userSpecifiedName: string | undefined): string {
    if (userSpecifiedName) {
      return userSpecifiedName
    }

    return snakeCase(pluralize.plural(targetName))
  }

  columnName(propertyName: string, customName: string, embeddedPrefixes: string[]): string {
    return snakeCase(super.columnName(propertyName, customName, embeddedPrefixes))
  }
}

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

export const connString = <DataSourceOptions>{
  ...dbConnectionOpts,
  namingStrategy: new SnakeNamingStrategy(),
  port: Number(dbConnectionOpts.port),
  driver: undefined,
  type: driver,
  synchronize: false,
  logging: 'all',
  logger: 'debug',
  entities: [`${__dirname}/../entity/**/*.ts`, `${__dirname}/../entity/**/*.js`],
  migrations: [`${__dirname}/../migration/*.ts`, `${__dirname}/../migration/*.js`],
  migrationsTransactionMode: 'each',
  subscribers: [],
  parseInt8: true, // https://github.com/typeorm/typeorm/issues/8583
}
