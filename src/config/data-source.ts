// load .env file
import 'dotenv-flow/config'

// then load everything else
import { globSync } from 'glob'
import path from 'path'
import pluralize from 'pluralize'
import 'reflect-metadata'
import { DataSource, DefaultNamingStrategy, NamingStrategyInterface, Table } from 'typeorm'
import { fileURLToPath } from 'url'
import _ from 'lodash'
import PgBoss from 'pg-boss'
import parse from 'pg-connection-string'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions.js'

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
    return `${replacedTableName}_${clonedColumnNames.join('_')}_idx`
  }

  uniqueConstraintName(tableOrName: Table | string, columnNames: string[]): string {
    const clonedColumnNames = [...columnNames]
    clonedColumnNames.sort()
    const tableName = this.getTableName(tableOrName)
    const replacedTableName = tableName.replace('.', '_')
    return `UQ_${replacedTableName}_${clonedColumnNames.join('_')}`
  }

  foreignKeyName(
    tableOrName: Table | string,
    columnNames: string[],
    _referencedTablePath?: string,
    _referencedColumnNames?: string[]
  ): string {
    const clonedColumnNames = [...columnNames]
    clonedColumnNames.sort()
    const tableName = this.getTableName(tableOrName)
    const replacedTableName = tableName.replace('.', '_')
    return `FK_${replacedTableName}_${clonedColumnNames.join('_')}`
  }
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const dbUrl = process.env.DATABASE_URL as string
export const pgBoss = new PgBoss(dbUrl)
const dbConnectionOpts = parse.parse(dbUrl)

// console.log(`Using connection parameters`, connString)
// console.log(`Using connection concurrency`, dbConnectionConcurrency)
// console.log(`Timezone is ${process.env.TZ}`)
// console.log(`System time is ${DateTime.now().toString()}`)
// console.log(`Local time is ${DateTime.local().toString()}`)
// console.log(`new Date is ${new Date().toISOString()}`)
export const AppDataSource = new DataSource(<PostgresConnectionOptions>{
  type: 'postgres',
  //
  username: dbConnectionOpts.user,
  password: dbConnectionOpts.password,
  host: dbConnectionOpts.host,
  port: dbConnectionOpts.port,
  database: dbConnectionOpts.database,
  //
  namingStrategy: new SnakeNamingStrategy(),
  synchronize: false,
  logging: 'all',
  logger: 'debug',
  entities: globSync(`${__dirname}/../entity/**/*.{ts,js,tsx}`, { ignore: '**/base_types.{ts,js}' }),
  migrations: [`${__dirname}/../migration/*.ts`, `${__dirname}/../migration/*.js`],
  migrationsTransactionMode: 'each',
  subscribers: [],
  parseInt8: true, // https://github.com/typeorm/typeorm/issues/8583
})
