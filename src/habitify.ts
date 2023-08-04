import {
  DateString,
  JournalAPIResult,
  HABITIFY_API_JOURNAL_URL,
  HABITIFY_API_LOGS_URL,
  HABITIFY_API_HABITS_URL,
  LogsAPIResult,
  HabitAPIResult,
  HabitsAPIResult,
} from './types'
import {
  validateHabit,
  validateHabits,
  validateJournal,
  validateLogs,
} from './validators'

import type { ValidateFunction } from 'ajv/dist/jtd'

/**
 * Client for Habitify API.
 * @param apiKey {string}
 * @returns Client
 */
export class Client {
  private constructor(private apiKey: string) {}

  static create(apiKey: string): Client {
    return new Client(apiKey)
  }

  /**
   * Get Client instance from environment variables (HABITIFY_API_KEY)
   * instead of passing the key directly.
   * @returns Client
   */
  static getClientFromEnv(): Client {
    const apiKey = process.env.HABITIFY_API_KEY
    if (apiKey === undefined) {
      throw new Error('HABITIFY_API_KEY is not set')
    }
    return Client.create(apiKey)
  }

  /**
   * Fetch data from Habitify API.
   * @param url
   * @returns data from Habitify API {T}
   * @throws Error if fetch failed
   */
  private async fetch(url: string): Promise<unknown> {
    const response = await fetch(url, {
      headers: {
        Authorization: this.apiKey,
      },
    })
    if (!response.ok) {
      throw new Error(`fetch failed: ${response.statusText}`)
    }
    return await response.json()
  }

  private async fetchWithValidation<T>(
    url: string,
    // should be ValidateFunction<T> but I don't know how to fix it
    validator: ValidateFunction<unknown>
  ): Promise<T> {
    const result = await this.fetch(url)
    if (!validator(result)) {
      const errors = validator.errors
      throw new Error(`invalid response: ${JSON.stringify(errors)}`)
    }
    return result as T
  }

  /**
   * Fetch journal data from Habitify API.
   * https://docs.habitify.me/core-resources/journal
   * @param targetDate A subset of ISO 8601 format: https://docs.habitify.me/date-format (e.g. 2023-07-24T00:00:00+09:00) {DateString}
   * @returns data from Habitify API {JournalAPIResult}
   */
  async fetchJournal(targetDate: DateString): Promise<JournalAPIResult> {
    const query = new URLSearchParams({
      target_date: targetDate,
    })
    const url = `${HABITIFY_API_JOURNAL_URL}?${query}`
    return await this.fetchWithValidation<JournalAPIResult>(
      url,
      validateJournal
    )
  }

  /**
   * Fetch logs data from Habitify API.
   * https://docs.habitify.me/core-resources/habits/logs
   * @param habitId {string}
   * @param fromDate A subset of ISO 8601 format: https://docs.habitify.me/date-format (e.g. 2023-07-01T00:00:00+09:00) {DateString}
   * @param toDate A subset of ISO 8601 format: https://docs.habitify.me/date-format (e.g. 2023-07-24T00:00:00+09:00) {DateString}
   * @throws Error if fetch failed
   * @returns data from Habitify API {LogsAPIResult}
   */
  async fetchLogs({
    habitId,
    fromDate,
    toDate,
  }: {
    habitId: string
    fromDate: DateString
    toDate: DateString
  }): Promise<LogsAPIResult> {
    const query = new URLSearchParams({
      from: fromDate,
      to: toDate,
    })
    const url = `${HABITIFY_API_LOGS_URL}/${habitId}?${query}`
    return await this.fetchWithValidation<LogsAPIResult>(url, validateLogs)
  }

  /**
   * Fetch habits data from Habitify API.
   * https://docs.habitify.me/core-resources/habits
   * @returns data from Habitify API {HabitsAPIResult}
   */
  async fetchHabits(): Promise<HabitsAPIResult> {
    const url = HABITIFY_API_HABITS_URL
    return await this.fetchWithValidation<HabitsAPIResult>(url, validateHabits)
  }

  /**
   * Fetch habit data from Habitify API.
   * https://docs.habitify.me/core-resources/habits
   * @param habitId {string}
   * @returns data from Habitify API {HabitAPIResult}
   */
  async fetchHabitById(habitId: string): Promise<HabitAPIResult> {
    const url = `${HABITIFY_API_HABITS_URL}/${habitId}`
    return await this.fetchWithValidation<HabitAPIResult>(url, validateHabit)
  }
}
