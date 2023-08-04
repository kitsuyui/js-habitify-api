import fs from 'fs'
import path from 'path'

import { createGenerator } from 'ts-json-schema-generator'

function main() {
  const typeNames = [
    'JournalAPIResult',
    'LogsAPIResult',
    'HabitAPIResult',
    'HabitsAPIResult',
  ]
  for (const name of typeNames) {
    buildSchema(name)
  }
}

function buildSchema(name: string) {
  const schemaPath = path.join(
    __dirname,
    `./src/__generated__/schema.${name}.json`
  )
  const config = {
    path: path.join(__dirname, './src/types.ts'),
    type: name,
  }
  const output = createGenerator(config).createSchema(config.type)
  const schemaString = JSON.stringify(output, null, 2)
  fs.writeFileSync(schemaPath, schemaString)
}

if (require.main === module) {
  main()
}
