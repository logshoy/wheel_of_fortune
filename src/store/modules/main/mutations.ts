import { MutationTree } from 'vuex'
import { State } from './state'
import { MutationTypes } from './mutation-types'
import { Iprize } from '@/data/presets'

export type Mutations<S = State> = {
  [MutationTypes.CHANGE_NAME] (state: S, name: string): void;
  [MutationTypes.CHANGE_PRIZES] (state: S, name: Iprize[]): void;
}

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.CHANGE_NAME] (state: State, name) {
    state.nameWheel = name
  },
  [MutationTypes.CHANGE_PRIZES] (state: State, prizes) {
    state.available = prizes
  }
}
