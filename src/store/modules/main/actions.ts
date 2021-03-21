import { ActionTree, ActionContext } from 'vuex'

import { RootState } from '@/store'
import { State } from './state'

import { Mutations } from './mutations'
import { MutationTypes } from './mutation-types'
import { AllActionTypes } from '@/store/action-types'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, 'commit'>

export interface Actions {
  [AllActionTypes.ADD_SIZE](
    { commit }: AugmentedActionContext,
    payload?: any
  ): void
}

export const actions: ActionTree<State, RootState> & Actions = {
  [AllActionTypes.ADD_SIZE] ({ commit }) {
    commit(MutationTypes.CHANGE_SIZE)
  }
}
