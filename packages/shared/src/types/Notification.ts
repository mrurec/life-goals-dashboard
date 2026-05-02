export type NotificationType = 'REMINDER' | 'ACHIEVEMENT' | 'WARNING' | 'MILESTONE'

export interface Notification {
  readonly id: string
  readonly type: NotificationType
  readonly title: string
  readonly body: string
  readonly createdAt: string
  readonly readAt: string | null
}
