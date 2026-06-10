import { loadEnv } from '../../shared/env.js'
import { createMySqlDatabase } from './client.js'
import { createMySqlTodoRepository } from './todo-repository.js'

const sampleTitles = [
  'Honoのドキュメントを読む',
  'Todo APIを実装する',
  '単体テストとAPIテストを追加する',
]

const env = loadEnv()
const repository = createMySqlTodoRepository(
  createMySqlDatabase(env.DATABASE_URL),
)

const existing = await repository.findAll()
if (existing.length > 0) {
  console.log(`Todos already exist (${existing.length}). Skipping seed.`)
  process.exit(0)
}

for (const title of sampleTitles) {
  await repository.create(title)
}

console.log(`Seeded ${sampleTitles.length} todos.`)
process.exit(0)
