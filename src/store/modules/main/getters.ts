import { GetterTree } from 'vuex'

import { RootState } from '@/store'
import { State } from './state'

export type Getters = {
  size (state: State): number;
}

export const getters: GetterTree<State, RootState> & Getters = {
  size: state => {
    return state.size
  }
}
