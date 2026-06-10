import type { Client } from '@libsql/client'
import { eq } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/libsql'
import type { TodoRepository } from '../../features/todos/repository.js'
import type { TodoUpdate } from '../../features/todos/todo.js'
import { todos } from './schema.js'

export const createSqliteTodoRepository = (client: Client): TodoRepository => {
  const db = drizzle(client)

  return {
    async findAll() {
      return db.select().from(todos).orderBy(todos.id)
    },

    async findById(id) {
      const [todo] = await db
        .select()
        .from(todos)
        .where(eq(todos.id, id))
        .limit(1)
      return todo
    },

    async create(title) {
      const [todo] = await db.insert(todos).values({ title }).returning()
      if (!todo) {
        throw new Error('Failed to create Todo')
      }
      return todo
    },

    async update(id, changes: TodoUpdate) {
      const [todo] = await db
        .update(todos)
        .set(changes)
        .where(eq(todos.id, id))
        .returning()
      return todo
    },

    async delete(id) {
      const deleted = await db
        .delete(todos)
        .where(eq(todos.id, id))
        .returning({ id: todos.id })
      return deleted.length > 0
    },
  }
}
