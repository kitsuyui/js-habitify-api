import Ajv from 'ajv'

import schemaHabitAPIResult from './__generated__/schema.HabitAPIResult.json'
import schemaHabitsAPIResult from './__generated__/schema.HabitsAPIResult.json'
import schemaJournalAPIResult from './__generated__/schema.JournalAPIResult.json'
import schemaLogsAPIResult from './__generated__/schema.LogsAPIResult.json'
import type {
  JournalAPIResult,
  LogsAPIResult,
  HabitAPIResult,
  HabitsAPIResult,
} from './types'

import type { JTDDataType } from 'ajv/dist/jtd'

const ajv = new Ajv()
export const validateHabit =
  ajv.compile<JTDDataType<HabitAPIResult>>(schemaHabitAPIResult)
export const validateHabits = ajv.compile<JTDDataType<HabitsAPIResult>>(
  schemaHabitsAPIResult
)
export const validateJournal = ajv.compile<JTDDataType<JournalAPIResult>>(
  schemaJournalAPIResult
)
export const validateLogs =
  ajv.compile<JTDDataType<LogsAPIResult>>(schemaLogsAPIResult)
