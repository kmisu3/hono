import { drizzle } from 'drizzle-orm/mysql2'

export const createMySqlDatabase = (url: string) => drizzle(url)

export type MySqlDatabase = ReturnType<typeof createMySqlDatabase>
