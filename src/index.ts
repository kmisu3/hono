import { serve } from '@hono/node-server'
import { createApp } from './app.js'
import { createMySqlDatabase } from './db/mysql/client.js'
import { createMySqlTodoRepository } from './db/mysql/todo-repository.js'
import { loadEnv } from './shared/env.js'

const env = loadEnv()

const db = createMySqlDatabase(env.DATABASE_URL)
const todoRepository = createMySqlTodoRepository(db)

serve({ fetch: createApp(todoRepository).fetch, port: env.PORT }, (info) => {
  console.log(`API server is running on http://localhost:${info.port}`)
})
