import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import type { TodoRepository } from '../../features/todos/repository.js'
import { createTestTodoRepository } from './test-database.js'

describe('SQLite TodoRepository', () => {
  let repository: TodoRepository
  let close: () => void

  beforeEach(async () => {
    const testDatabase = await createTestTodoRepository()
    repository = testDatabase.repository
    close = testDatabase.close
  })

  afterEach(() => close())

  it('Todoを作成して取得する', async () => {
    const created = await repository.create('SQLiteでテストする')

    expect(await repository.findById(created.id)).toEqual(created)
  })

  it('Todoを更新する', async () => {
    const created = await repository.create('SQLiteでテストする')

    const updated = await repository.update(created.id, { completed: true })

    expect(updated?.completed).toBe(true)
  })

  it('Todoを削除する', async () => {
    const created = await repository.create('SQLiteでテストする')

    expect(await repository.delete(created.id)).toBe(true)
    expect(await repository.findById(created.id)).toBeUndefined()
  })
})
