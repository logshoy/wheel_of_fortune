import { getAvailable } from '@/data'
import { PRESET1 } from '@/data/presets'
import { deepClone } from '@/util'

const data = deepClone(PRESET1)

export type State = {
  available: any,
  nameWheel: string
}
// set state
export const state: State = {
  available: deepClone(getAvailable(data)),
  nameWheel: 'Колеcо Фортуны'
}
