import { mqttProcessor } from '#mqtt/main'
import { webCLIParse } from '#helpers/cli'
import { AppDataSource } from '#config/data-source'
import { app } from '#web/app'

const cliOptions = webCLIParse()

const db = await AppDataSource.initialize()

await AppDataSource.runMigrations({
  transaction: 'each',
})

const port = process.env.PORT || 3333
app.listen(port)

console.log(`Meshmap server has started on port ${port}. Open http://localhost:${port}/ to see results`)

if (cliOptions.mqtt) {
  await mqttProcessor(db, cliOptions)
}
