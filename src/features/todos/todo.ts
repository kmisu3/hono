export type Todo = {
  id: number
  title: string
  completed: boolean
}

export type TodoUpdate = Partial<Pick<Todo, 'title' | 'completed'>>

export const createTodo = (id: number, title: string): Todo => ({
  id,
  title,
  completed: false,
})

export const updateTodo = (todo: Todo, changes: TodoUpdate): Todo => ({
  ...todo,
  ...changes,
})
