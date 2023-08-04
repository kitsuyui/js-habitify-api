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

/**
 * Client for Habitify API.
 * @param apiKey {string}
 * @returns Client
 */
export class Client {
  constructor(private apiKey: string) {}

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
    return new Client(apiKey)
  }

  /**
   * Fetch data from Habitify API.
   * @param url
   * @returns data from Habitify API {T}
   * @throws Error if fetch failed
   */
  async fetch<T>(url: string): Promise<T> {
    const response = await fetch(url, {
      headers: {
        Authorization: this.apiKey,
      },
    })
    if (!response.ok) {
      throw new Error(`fetch failed: ${response.statusText}`)
    }
    // TODO: validate response json
    const data = (await response.json()) as T
    return data
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
    return await this.fetch<JournalAPIResult>(url)
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
    return await this.fetch<LogsAPIResult>(url)
  }

  /**
   * Fetch habits data from Habitify API.
   * https://docs.habitify.me/core-resources/habits
   * @returns data from Habitify API {HabitsAPIResult}
   */
  async fetchHabits(): Promise<HabitsAPIResult> {
    return await this.fetch<HabitsAPIResult>(HABITIFY_API_HABITS_URL)
  }

  /**
   * Fetch habit data from Habitify API.
   * https://docs.habitify.me/core-resources/habits
   * @param habitId {string}
   * @returns data from Habitify API {HabitAPIResult}
   */
  async fetchHabitById(habitId: string): Promise<HabitAPIResult> {
    const url = `${HABITIFY_API_HABITS_URL}/${habitId}`
    return await this.fetch<HabitAPIResult>(url)
  }
}
