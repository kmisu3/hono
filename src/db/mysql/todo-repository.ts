import { eq } from 'drizzle-orm'
import type { TodoRepository } from '../../features/todos/repository.js'
import type { TodoUpdate } from '../../features/todos/todo.js'
import type { MySqlDatabase } from './client.js'
import { todos } from './schema.js'

export const createMySqlTodoRepository = (
  db: MySqlDatabase,
): TodoRepository => ({
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
    const [result] = await db.insert(todos).values({ title }).$returningId()
    const todo = result && (await this.findById(result.id))
    if (!todo) {
      throw new Error('Failed to create Todo')
    }
    return todo
  },

  async update(id, changes: TodoUpdate) {
    const existing = await this.findById(id)
    if (!existing) {
      return undefined
    }
    await db.update(todos).set(changes).where(eq(todos.id, id))
    return this.findById(id)
  },

  async delete(id) {
    const result = await db.delete(todos).where(eq(todos.id, id))
    return result[0].affectedRows > 0
  },
})
