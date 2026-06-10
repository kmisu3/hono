import type { Todo, TodoUpdate } from './todo.js'

export type TodoRepository = {
  findAll(): Promise<Todo[]>
  findById(id: number): Promise<Todo | undefined>
  create(title: string): Promise<Todo>
  update(id: number, changes: TodoUpdate): Promise<Todo | undefined>
  delete(id: number): Promise<boolean>
}
