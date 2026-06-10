import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { createApp } from './app.js'
import { createTestTodoRepository } from './db/sqlite/test-database.js'
import type { TodoRepository } from './features/todos/repository.js'

describe('Todo API', () => {
  let repository: TodoRepository
  let close: () => void

  beforeEach(async () => {
    const testDatabase = await createTestTodoRepository()
    repository = testDatabase.repository
    close = testDatabase.close
  })

  afterEach(() => close())

  it('returns a health response', async () => {
    const response = await createApp(repository).request('/health')

    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ status: 'ok' })
  })

  it('creates and fetches a todo', async () => {
    const app = createApp(repository)
    const createResponse = await app.request('/api/todos', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ title: 'APIを開発する' }),
    })

    expect(createResponse.status).toBe(201)

    const listResponse = await app.request('/api/todos')
    const body = await listResponse.json()

    expect(body.data).toHaveLength(1)
    expect(body.data[0].title).toBe('APIを開発する')
  })

  it('rejects an empty title', async () => {
    const response = await createApp(repository).request('/api/todos', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ title: '' }),
    })

    expect(response.status).toBe(400)
  })

  it('rejects a non-numeric id', async () => {
    const response = await createApp(repository).request('/api/todos/abc')

    expect(response.status).toBe(400)
  })

  it('keeps the todo when an update does not change values', async () => {
    const app = createApp(repository)
    const created = await repository.create('値を変えずに更新する')

    const response = await app.request(`/api/todos/${created.id}`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ completed: false }),
    })

    expect(response.status).toBe(200)
    const body = await response.json()
    expect(body.data).toEqual(created)
  })
})
