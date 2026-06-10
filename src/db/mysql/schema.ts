import { boolean, int, mysqlTable, varchar } from 'drizzle-orm/mysql-core'

export const todos = mysqlTable('todos', {
  id: int().autoincrement().primaryKey(),
  title: varchar({ length: 100 }).notNull(),
  completed: boolean().notNull().default(false),
})
