import { createClient } from '@libsql/client'
import { createSqliteTodoRepository } from './todo-repository.js'

export const createTestTodoRepository = async () => {
  const client = createClient({ url: ':memory:' })

  await client.execute(`
    CREATE TABLE todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      completed INTEGER NOT NULL DEFAULT 0
    )
  `)

  return {
    repository: createSqliteTodoRepository(client),
    close: () => client.close(),
  }
}
