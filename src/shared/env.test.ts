import { describe, expect, it } from 'vitest'
import { loadEnv } from './env.js'

describe('loadEnv', () => {
  it('PORTが未指定なら3000を既定値にする', () => {
    const env = loadEnv({ DATABASE_URL: 'mysql://localhost/app' })

    expect(env.PORT).toBe(3000)
  })

  it('PORTを数値へ変換する', () => {
    const env = loadEnv({ DATABASE_URL: 'mysql://localhost/app', PORT: '8080' })

    expect(env.PORT).toBe(8080)
  })

  it('DATABASE_URLが無ければ例外を投げる', () => {
    expect(() => loadEnv({})).toThrow(/DATABASE_URL/)
  })

  it('PORTが数値でなければ例外を投げる', () => {
    expect(() =>
      loadEnv({ DATABASE_URL: 'mysql://localhost/app', PORT: 'abc' }),
    ).toThrow(/PORT/)
  })
})
