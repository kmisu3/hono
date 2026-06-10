import { describe, expect, it } from 'vitest'
import { createApp } from './app.js'

describe('Todo API', () => {
  it('returns a health response', async () => {
    const response = await createApp().request('/health')

    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ status: 'ok' })
  })

  it('creates and fetches a todo', async () => {
    const app = createApp()
    const createResponse = await app.request('/api/todos', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ title: 'APIを開発する' }),
    })

    expect(createResponse.status).toBe(201)

    const listResponse = await app.request('/api/todos')
    const body = await listResponse.json()

    expect(body.data).toHaveLength(2)
    expect(body.data[1].title).toBe('APIを開発する')
  })

  it('rejects an empty title', async () => {
    const response = await createApp().request('/api/todos', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ title: '' }),
    })

    expect(response.status).toBe(400)
  })
})
