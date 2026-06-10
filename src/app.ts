import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { z } from 'zod'

type Todo = {
  id: number
  title: string
  completed: boolean
}

const createTodoSchema = z.object({
  title: z.string().trim().min(1).max(100),
})

const updateTodoSchema = z
  .object({
    title: z.string().trim().min(1).max(100).optional(),
    completed: z.boolean().optional(),
  })
  .refine((value) => value.title !== undefined || value.completed !== undefined, {
    message: 'At least one field is required',
  })

export const createApp = () => {
  const app = new Hono()
  const todos: Todo[] = [
    { id: 1, title: 'Honoを試す', completed: false },
  ]
  let nextId = 2

  app.use('*', logger())

  app.get('/', (c) =>
    c.json({
      message: 'Hono local learning API',
      endpoints: '/health, /api/todos',
    }),
  )

  app.get('/health', (c) => c.json({ status: 'ok' }))

  app.get('/api/todos', (c) => c.json({ data: todos }))

  app.get('/api/todos/:id', (c) => {
    const todo = todos.find((item) => item.id === Number(c.req.param('id')))
    return todo
      ? c.json({ data: todo })
      : c.json({ error: 'Todo not found' }, 404)
  })

  app.post('/api/todos', zValidator('json', createTodoSchema), (c) => {
    const input = c.req.valid('json')
    const todo: Todo = { id: nextId++, title: input.title, completed: false }
    todos.push(todo)
    return c.json({ data: todo }, 201)
  })

  app.patch('/api/todos/:id', zValidator('json', updateTodoSchema), (c) => {
    const todo = todos.find((item) => item.id === Number(c.req.param('id')))
    if (!todo) {
      return c.json({ error: 'Todo not found' }, 404)
    }

    Object.assign(todo, c.req.valid('json'))
    return c.json({ data: todo })
  })

  app.delete('/api/todos/:id', (c) => {
    const index = todos.findIndex(
      (item) => item.id === Number(c.req.param('id')),
    )
    if (index === -1) {
      return c.json({ error: 'Todo not found' }, 404)
    }

    todos.splice(index, 1)
    return c.body(null, 204)
  })

  app.notFound((c) => c.json({ error: 'Route not found' }, 404))
  app.onError((error, c) => {
    console.error(error)
    return c.json({ error: 'Internal server error' }, 500)
  })

  return app
}
