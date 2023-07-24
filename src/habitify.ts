import { DateString, JournalAPIResult, HABITIFY_API_JOURNAL_URL } from './types'

export async function getTodaysJournal(
  apiKey: string,
  targetDate: DateString
): Promise<JournalAPIResult> {
  const query = new URLSearchParams({
    target_date: targetDate,
  })
  const url = `${HABITIFY_API_JOURNAL_URL}?${query}`
  const response = await fetch(url, {
    headers: {
      Authorization: apiKey,
    },
  })
  const data = (await response.json()) as JournalAPIResult
  return data
}
