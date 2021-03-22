import { GetterTree } from 'vuex'

import { RootState } from '@/store'
import { State } from './state'

export type Getters = {
  nameWheel (state: State): string;
}

export const getters: GetterTree<State, RootState> & Getters = {
  nameWheel: state => {
    return state.nameWheel
  }
}
