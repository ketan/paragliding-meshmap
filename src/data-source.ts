import 'reflect-metadata'
import { DataSource, DefaultNamingStrategy, NamingStrategyInterface } from 'typeorm'
import { camelCase, snakeCase } from 'typeorm/util/StringUtils.js';
import pluralize from 'pluralize';

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
export const AppDataSource = new DataSource({
  namingStrategy: new SnakeNamingStrategy(),
  type: 'sqlite',
  // host: "localhost",
  // port: 5432,
  // username: "test",
  // password: "test",
  database: 'tmp/paragliding-meshmap.sqlite3',
  synchronize: false,
  logging: 'all',
  logger: 'debug',
  entities: ['src/entity/**/*.ts'],
  migrations: ['src/migration/*.ts'],
  subscribers: [],
})
