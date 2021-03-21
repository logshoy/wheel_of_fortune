import { getAvailable } from '@/data'
import { PRESET1 } from '@/data/presets'
import { deepClone } from '@/util'

const data = deepClone(PRESET1)

export type State = {
  totalSpins: number,
  spins: number,
  lastResult: number,
  showOptions: boolean,
  size: number,
  data: any,
  available: any,
  records: [],
}
// set state
export const state: State = {
  totalSpins: 0,
  spins: 0,
  lastResult: -1,
  showOptions: false,
  size: 0,
  data,
  available: deepClone(getAvailable(data.prizes)),
  records: []
}
