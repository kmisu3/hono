import { zValidator } from '@hono/zod-validator'
import { type Context, Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { secureHeaders } from 'hono/secure-headers'
import { z } from 'zod'
import type { TodoRepository } from './features/todos/repository.js'

const createTodoSchema = z
  .object({
    title: z.string().trim().min(1).max(100),
  })
  .strict()

const updateTodoSchema = z
  .object({
    title: z.string().trim().min(1).max(100).optional(),
    completed: z.boolean().optional(),
  })
  .strict()
  .refine(
    (value) => value.title !== undefined || value.completed !== undefined,
    {
      message: 'At least one field is required',
    },
  )

const todoParamSchema = z.object({
  id: z.coerce.number().int().positive(),
})

const validationHook = (result: { success: boolean }, c: Context) => {
  if (!result.success) {
    return c.json({ error: 'Invalid request' }, 400)
  }
}

export const createApp = (todoRepository: TodoRepository) => {
  const app = new Hono()

  app.use('*', logger())
  app.use('*', secureHeaders())
  app.use('/api/*', cors())

  app.get('/', (c) =>
    c.json({
      message: 'Hono API',
      endpoints: '/health, /api/todos',
    }),
  )

  app.get('/health', (c) => c.json({ status: 'ok' }))

  app.get('/api/todos', async (c) =>
    c.json({ data: await todoRepository.findAll() }),
  )

  app.get(
    '/api/todos/:id',
    zValidator('param', todoParamSchema, validationHook),
    async (c) => {
      const { id } = c.req.valid('param')
      const todo = await todoRepository.findById(id)
      return todo
        ? c.json({ data: todo })
        : c.json({ error: 'Todo not found' }, 404)
    },
  )

  app.post(
    '/api/todos',
    zValidator('json', createTodoSchema, validationHook),
    async (c) => {
      const input = c.req.valid('json')
      const todo = await todoRepository.create(input.title)
      return c.json({ data: todo }, 201)
    },
  )

  app.patch(
    '/api/todos/:id',
    zValidator('param', todoParamSchema, validationHook),
    zValidator('json', updateTodoSchema, validationHook),
    async (c) => {
      const { id } = c.req.valid('param')
      const todo = await todoRepository.update(id, c.req.valid('json'))
      return todo
        ? c.json({ data: todo })
        : c.json({ error: 'Todo not found' }, 404)
    },
  )

  app.delete(
    '/api/todos/:id',
    zValidator('param', todoParamSchema, validationHook),
    async (c) => {
      const { id } = c.req.valid('param')
      const deleted = await todoRepository.delete(id)
      if (!deleted) {
        return c.json({ error: 'Todo not found' }, 404)
      }

      return c.body(null, 204)
    },
  )

  app.notFound((c) => c.json({ error: 'Route not found' }, 404))
  app.onError((error, c) => {
    console.error(error)
    return c.json({ error: 'Internal server error' }, 500)
  })

  return app
}
