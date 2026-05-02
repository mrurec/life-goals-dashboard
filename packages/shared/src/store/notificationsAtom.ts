import { atom } from 'jotai'
import type { Notification } from '../types/Notification'

export const notificationsAtom = atom<readonly Notification[]>([])
