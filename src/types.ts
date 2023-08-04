export const HABITIFY_API_BASE_URL = 'https://api.habitify.me'
export const HABITIFY_API_JOURNAL_URL = `${HABITIFY_API_BASE_URL}/journal`
export const HABITIFY_API_LOGS_URL = `${HABITIFY_API_BASE_URL}/logs`
export const HABITIFY_API_HABITS_URL = `${HABITIFY_API_BASE_URL}/habits`

// https://docs.habitify.me/core-resources/journal
export interface JournalAPIResult {
  errors: unknown[]
  message: string
  data: JournalContent[]
  version: string
  status: boolean
}

export interface JournalContent {
  id: IDString
  name: string
  is_archived: boolean
  start_date: DateString
  time_of_day: TimeOfDay[]
  goal: GoalItem
  goal_history_items: GoalItem[]
  log_method: LogMethod
  recurrence: Recurrence
  remind: Remind[]
  area?: Area | null
  created_date: DateString
  priority: number
  status: Status
  progress?: Progress
  habit_type: number
}

export interface GoalItem {
  unit_type: UnitType
  value: number
  periodicity: Periodicity
}

export interface Area {
  id: IDString
  name: string
  priority: string
}

export interface Progress {
  current_value: number
  target_value: number
  unit_type: UnitType
  periodicity: Periodicity
  reference_date: DateString
}

export type Remind = unknown // TODO
export type Status = 'in_progress' | 'completed' | 'failed' | 'skipped' | 'none'
// https://docs.habitify.me/enum/time-of-day
export type TimeOfDay = 'any_time' | 'morning' | 'afternoon' | 'evening'
export type UnitType = 'rep' // https://docs.habitify.me/enum/unit-type#scalar
export type Priority = 'U' | 'B' | '9' | '2' | '4' | '1' // ???
export type Periodicity = 'daily' | 'weekly' | 'monthly'
// https://docs.habitify.me/enum/log-method
export type LogMethod = 'manual' | 'appleHealth' | 'googleFit' | 'samsungHealth'
export type DateString = string
export type Recurrence = string
export type IDString = string

export interface LogsAPIResult {
  errors: unknown[]
  message: string
  data: LogsContent[]
  version: string
  status: boolean
}
export interface LogsContent {
  id: IDString
  value: number
  created_date: DateString
  unit_type: UnitType
  habit_id: IDString
}

// https://docs.habitify.me/core-resources/habits
export interface HabitsAPIResult {
  errors: unknown[]
  message: string
  data: HabitContent[]
  version: string
  status: boolean
}

export interface HabitAPIResult {
  errors: unknown[]
  message: string
  data: HabitContent
  version: string
  status: boolean
}

export interface HabitContent {
  id: IDString
  name: string
  is_archived: boolean
  start_date: DateString
  time_of_day: TimeOfDay[]
  goal: GoalItem
  goal_history_items: GoalItem[]
  log_method: LogMethod
  recurrence: Recurrence
  remind: Remind[]
  area: Area | null
  created_date: DateString
  priority: number
}
