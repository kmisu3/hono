import { describe, expect, it } from 'vitest'
import { loadEnv } from './env.js'

describe('loadEnv', () => {
  describe('正常系', () => {
    it('PORT未指定時に既定値3000になること', () => {
      const env = loadEnv({ DATABASE_URL: 'mysql://localhost/app' })

      expect(env.PORT).toBe(3000)
    })

    it('PORTが数値へ変換されること', () => {
      const env = loadEnv({
        DATABASE_URL: 'mysql://localhost/app',
        PORT: '8080',
      })

      expect(env.PORT).toBe(8080)
    })
  })

  describe('異常系', () => {
    it('DATABASE_URLが無い場合に例外を投げること', () => {
      expect(() => loadEnv({})).toThrow(/DATABASE_URL/)
    })

    it('PORTが数値でない場合に例外を投げること', () => {
      expect(() =>
        loadEnv({ DATABASE_URL: 'mysql://localhost/app', PORT: 'abc' }),
      ).toThrow(/PORT/)
    })
  })
})
