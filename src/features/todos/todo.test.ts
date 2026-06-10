import { describe, expect, it } from 'vitest'
import { createTodo, updateTodo } from './todo.js'

describe('Todo', () => {
  it('未完了のTodoを作成する', () => {
    const todo = createTodo(1, '単体テストを追加する')

    expect(todo).toEqual({
      id: 1,
      title: '単体テストを追加する',
      completed: false,
    })
  })

  it('指定された項目だけを更新する', () => {
    const todo = createTodo(1, '単体テストを追加する')

    const updated = updateTodo(todo, { completed: true })

    expect(updated).toEqual({
      id: 1,
      title: '単体テストを追加する',
      completed: true,
    })
  })

  it('更新前のTodoを変更しない', () => {
    const todo = createTodo(1, '単体テストを追加する')

    updateTodo(todo, { title: '単体テストを更新する' })

    expect(todo.title).toBe('単体テストを追加する')
  })
})
