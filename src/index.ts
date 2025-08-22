import { mqttProcessor } from '#mqtt/main'
import { webCLIParse } from '#helpers/cli'
import { AppDataSource, pgBoss } from '#config/data-source'
import { app } from '#web/app'
import { autoPartition } from './cron/auto-partition.js'
import { emailJobProcessor } from '#helpers/email-job'

const cliOptions = webCLIParse()

const db = await AppDataSource.initialize()

await AppDataSource.runMigrations({
  transaction: 'each',
})

const port = process.env.PORT || 3333
app.listen(port)

console.log(`Meshmap server has started on port ${port}. Open http://localhost:${port}/ to see results`)

if (cliOptions.autoPartition) {
  autoPartition(db)
}

await pgBoss.start()
await emailJobProcessor()

if (cliOptions.mqtt) {
  await mqttProcessor(db, cliOptions)
}
