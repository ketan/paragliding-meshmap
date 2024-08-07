import parseDatabaseUrl, { DatabaseConfig } from 'ts-parse-database-url'
import _ from 'lodash'

function normalizeDriver(dbConnectionOpts: DatabaseConfig) {
  const driver = dbConnectionOpts.driver
  if (driver === 'postgresql') {
    return 'postgres'
  } else if (driver === 'sqlite3') {
    return 'sqlite'
  } else {
    return driver
  }
}

export function dbConnectionOptions(dbUrl: string) {
  const dbConfig = parseDatabaseUrl.default(dbUrl)

  const dbConnectionOpts = { ...dbConfig, username: dbConfig.user }
  const driver = normalizeDriver(dbConnectionOpts)

  // remove driver
  delete dbConnectionOpts['driver']

  // remove port if empty
  if (!dbConnectionOpts.port) {
    delete dbConnectionOpts['port']
  }

  _.omitBy(dbConnectionOpts, _.isNil)

  return { dbConnectionOpts, driver }
}
