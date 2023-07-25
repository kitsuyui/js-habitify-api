import {
  DateString,
  JournalAPIResult,
  HABITIFY_API_JOURNAL_URL,
  HABITIFY_API_LOGS_URL,
  LogsAPIResult,
} from './types'

export class Client {
  constructor(private apiKey: string) {}

  static getClientFromEnv(): Client {
    const apiKey = process.env.HABITIFY_API_KEY
    if (apiKey === undefined) {
      throw new Error('HABITIFY_API_KEY is not set')
    }
    return new Client(apiKey)
  }

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

  async fetchJournal(targetDate: DateString): Promise<JournalAPIResult> {
    const query = new URLSearchParams({
      target_date: targetDate,
    })
    const url = `${HABITIFY_API_JOURNAL_URL}?${query}`
    return await this.fetch<JournalAPIResult>(url)
  }

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
}
