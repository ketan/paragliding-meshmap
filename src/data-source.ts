import 'reflect-metadata'
import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
  type: 'sqlite',
  // host: "localhost",
  // port: 5432,
  // username: "test",
  // password: "test",
  database: 'tmp/paragliding-meshmap.sqlite3',
  synchronize: false,
  logging: true,
  entities: ['src/entity/**/*.ts'],
  migrations: ['src/migration/*.ts'],
  subscribers: [],
})
