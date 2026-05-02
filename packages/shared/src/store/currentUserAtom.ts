import { atom } from 'jotai'
import type { CurrentUser } from '../types/CurrentUser'

export const currentUserAtom = atom<CurrentUser | null>(null)
