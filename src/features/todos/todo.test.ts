import { describe, expect, it } from 'vitest'
import { createTodo, updateTodo } from './todo.js'

describe('Todo', () => {
  describe('正常系', () => {
    it('未完了のTodoが作成されること', () => {
      const todo = createTodo(1, '単体テストを追加する')

      expect(todo).toEqual({
        id: 1,
        title: '単体テストを追加する',
        completed: false,
      })
    })

    it('指定された項目だけが更新されること', () => {
      const todo = createTodo(1, '単体テストを追加する')

      const updated = updateTodo(todo, { completed: true })

      expect(updated).toEqual({
        id: 1,
        title: '単体テストを追加する',
        completed: true,
      })
    })

    it('更新時に元のTodoが変更されないこと', () => {
      const todo = createTodo(1, '単体テストを追加する')

      updateTodo(todo, { title: '単体テストを更新する' })

      expect(todo.title).toBe('単体テストを追加する')
    })
  })
})
