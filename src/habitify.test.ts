import { describe, it, expect } from '@jest/globals'

import { Client } from './habitify'
import { HABITIFY_API_HABITS_URL, HabitAPIResult } from './types'
import { validateHabit } from './validators'

describe('habitify client', () => {
  it('getClientFromEnv', () => {
    const client = Client.getClientFromEnv()
    expect(client).toBeDefined()
  })

  it('getClientFromEnv failed', () => {
    const oldEnv = process.env
    process.env = {}
    expect(() => Client.getClientFromEnv()).toThrowError(
      'HABITIFY_API_KEY is not set'
    )
    process.env = oldEnv
  })

  it('failed to fetch for invalid URL', async () => {
    const client = Client.getClientFromEnv()
    const result = client.fetch('https://api.habitify.me/v0/')
    await expect(result).rejects.toThrowError('fetch failed: Not Found')
  })

  it('fetchJournal', async () => {
    const client = Client.getClientFromEnv()
    const result = await client.fetchJournal('2023-07-24T00:00:00+09:00')
    expect(result).toBeDefined()
    expect(result.data).toBeDefined()
    expect(result.data.length).toBeGreaterThan(0)
  })

  it('fetchLogs', async () => {
    const client = Client.getClientFromEnv()
    const journal = await client.fetchJournal('2023-07-24T00:00:00+09:00')

    const result = await client.fetchLogs({
      habitId: journal.data[0].id,
      fromDate: '2023-07-01T00:00:00+09:00',
      toDate: '2023-07-24T00:00:00+09:00',
    })
    expect(result).toBeDefined()
    expect(result.data).toBeDefined()
    expect(result.data.length).toBeGreaterThan(0)
  })

  it('fetchHabits', async () => {
    const client = Client.getClientFromEnv()
    const result = await client.fetchHabits()
    expect(result).toBeDefined()
    expect(result.data).toBeDefined()
  })

  it('fetchHabitById', async () => {
    const client = Client.getClientFromEnv()
    const result = await client.fetchHabitById(
      '5DD6DC1C-5640-4D9B-9FD9-DEE0000BB845'
    )
    expect(result).toBeDefined()
    expect(result.data).toBeDefined()
  })

  it('fetchWithValidation failed with incompatible type', async () => {
    const client = Client.getClientFromEnv()

    // Use HabitAPIResult as a type that is incompatible with the actual data type (HabitsAPIResult)
    const result = client.fetchWithValidation<HabitAPIResult>(
      HABITIFY_API_HABITS_URL,
      validateHabit
    )
    await expect(result).rejects.toThrowError()
  })
})
