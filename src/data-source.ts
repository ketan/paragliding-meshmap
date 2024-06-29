import pluralize from 'pluralize'
import 'reflect-metadata'
import { DataSource, DefaultNamingStrategy, NamingStrategyInterface } from 'typeorm'
import { snakeCase } from 'typeorm/util/StringUtils.js'
import path from 'path'
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

export const AppDataSource = new DataSource({
  namingStrategy: new SnakeNamingStrategy(),
  type: 'sqlite',
  // host: "localhost",
  // port: 5432,
  // username: "test",
  // password: "test",
  database: './tmp/paragliding-meshmap.sqlite3',
  synchronize: false,
  logging: 'all',
  logger: 'debug',
  entities: [`${__dirname}/entity/**/*.ts`, `${__dirname}/entity/**/*.js`],
  migrations: [`${__dirname}/migration/*.ts`, `${__dirname}/migration/*.js`],
  migrationsTransactionMode: 'each',
  subscribers: [],
})
