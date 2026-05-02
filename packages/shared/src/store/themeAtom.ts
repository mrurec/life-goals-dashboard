import { atomWithStorage } from 'jotai/utils'
import type { Theme } from '../types/Theme'

const THEME_STORAGE_KEY = 'life-goals:theme'

export const themeAtom = atomWithStorage<Theme>(THEME_STORAGE_KEY, 'system')
