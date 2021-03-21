import { MutationTree } from 'vuex'
import { State } from './state'
import { MutationTypes } from './mutation-types'

export type Mutations<S = State> = {
  [MutationTypes.CHANGE_SIZE] (state: S, size: number): void;

}

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.CHANGE_SIZE] (state: State, size) {
    state.size = size
  }
}
